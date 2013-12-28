/**
 * The packager contains logic for compiling components and javascript
 * dependencies, as well as the endpoints for serving them as multiplexed XHR
 * Requests.
 *
 * @class packager (server)
 * @module Superfluous
 * @submodule Server
 */

"use strict";

var module_grapher = require("module-grapher");
var async = require("async");
var _ = require_vendor("underscore");
var less = require("less");
var path = require("path");
var quick_hash = require_core("server/hash");
var readfile = require_core("server/readfile");
var hooks = require_core("server/hooks");

var less_header = readfile("app/static/styles/definitions.less") +
  readfile("core/static/styles/definitions.less");

function readstyle(mod) {
  var data = readfile(mod + ".css");
  if (!data) {    
    data = readfile(mod + ".less");
  }
  return data;
}

function package_less(includes, cb) {
  var included = _.map(includes, function(s) { return s.trim(); });

  var ret = {};
  async.each(included, function(mod, done) {
    var data = readstyle(mod);
    if (data) {
      hooks.invoke("before_render_less", mod, less_header + data.toString(), function(mod, data) {
        less.render(data, function(err, css) {
          if (err) {
            console.log("Error rendering less module:", mod, err);
          }

          hooks.invoke("after_render_less", mod, css, function(mod, css) { 
            var hash = quick_hash(css.toString());
            ret[mod] = {
              code: css,
              signature: hash,
              name: mod,
              type: "css",
              timestamp: parseInt(+Date.now() / 1000, 10)
            };

            done();
          });

        });
      });
    } else {
      done();
    }

  }, function(err) {
    cb(ret);
  });
}

function package_and_scope_less(component, module, cb) {
  var ret = {};
  var data = readstyle(module);

  var module_css = ".cmp-" + component + " {\n";
  var module_end = "\n}";
  var hash = quick_hash(data.toString());
  less.render(less_header + module_css + (data || "") + module_end, function(err, css) {
    ret[module] = {
      code: css,
      signature: hash,
      name: module,
      type: "css"
    };

    cb(ret);
  });
}

function package_js(includes, cb) {
  var included = _.map(includes, function(s) { return s.trim(); });
  var excluded = [];


  var definition = {
    baseUrl: "./",
    include: included,
    out: "tmp-build",
    optimize: "uglify",
    excludeShallow: excluded
  };


  var ret = {};
  _.each(included, function(inc) {
    module_grapher.graph(inc, {
        paths: [ './', './static', path.join(__dirname, '../../') ]
      }, function(__, resolved) {
        if (!resolved || !resolved.modules) {
          return cb("console.log('Error loading module " + inc + "');");
        }

        // each works on arrays, not objects
        var modules = _.map(resolved.modules, function(v, k) { return v; });
        async.each(
          modules,
          function(mod, done) {
            var data = readfile.both(mod + ".js");
            hooks.invoke("before_render_js", mod.id, data, function(name, data) {
              hooks.invoke("after_render_js", mod.id, data, function(name, data) {
                ret[name] = {
                  code: data,
                  signature: quick_hash(data),
                  type: "js",
                  name: name,
                  timestamp: parseInt(+Date.now() / 1000, 10)
                };
              });
            });
            done();
          },
          function(err) {
            cb(ret);
          });
      });
  });

}

module.exports = {
  js: package_js,
  less: package_less,
  scoped_less: package_and_scope_less
}
