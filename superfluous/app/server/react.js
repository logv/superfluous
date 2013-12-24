"use strict";

var _ = require_vendor("underscore");
var React = require_vendor("react/react");
var JSXTransformer = require_vendor("react/JSXTransformer");
var async = require("async");
var $ = require("cheerio");

var fs = require("fs");
var context = require_core("server/context");
var bridge = require_core("server/bridge");

var template = require_core("server/template");
var readfile = require_core("server/readfile");
var packager = require_core("server/packager");
var Module = require("module").Module;


var __id = 0;

global.React = React;

function add_packager() {
  var bootloader = require_core("controllers/bootloader/server");
  var react = function() {
    var req = context("req");
    var res = context("res");

    var loaded = {};

    var modules = JSON.parse(req.query.m);
    async.each(
      modules,
      function(module, cb) {
        var ret = ReactLoader.load_code(module);
        var pkg = ReactLoader.load_package(module);
        ReactLoader.load_style(module, pkg.style, function(style) {
          loaded[module] = { 
            main: ret,
            style: style,
            styles: pkg.styles,
            schema: pkg
          };

          cb();
        });
      }, function(err, results) {
        res.set("Content-Type", "application/json");

        res.end(JSON.stringify(loaded));
      });
  };

  bootloader.add_packaging_endpoint('react', react);
  bridge.add_marshaller("react", function(arg) {
    if (arg && arg.isReact) {
      return { id: arg.id, isReact: true };
    }
  });
}

var ReactLoader = {
  load_code: function(component, cb) {
    var base_dir = "./react/" + component + "/";
    var filename = base_dir + component + ".js";
    var data = readfile(filename);
    if (data) {
      var transformed = JSXTransformer.transform(data);
      if (cb) {
        cb(transformed.code);
      }

      return transformed.code;
    }
  },
  load_style: function(component, style_file, cb) {
    packager.scoped_less(component, style_file, function(data) {
      if (cb) {
        cb(data[style_file]);
      }
    });

  },
  load_package: function(component, cb) {
    var base_dir = "./react/" + component + "/";
    var filename = base_dir + "package.json";
    var data = readfile(filename);
    return data;
  },

  load: function(component, options) {
    options = options || {};

    var code = ReactLoader.load_code(component);
    var ReactClass = new Module(component, "React");
    ReactClass._compile(code, component);

    var instance = new ReactClass.exports(options);

    var page = require_core("server/page");
    return {
      toString: function() {
        return page.async(function(flush) {
          React.renderComponentToString(instance, function(html) {
            bridge.call("app/client/react", "instantiate", component, options);
            var div = $("<div />");
            var innerDiv = $("<div />");
            div.append(innerDiv);
            innerDiv.attr('id', options.id);
            innerDiv.html(html);

            flush(div.html());
          });
        })();
      },
      instance: instance,
      isReact: true,
      id: instance.id
    };
  },

  build: function(component, options) {
    var base_dir = "./react/" + component + "/";
    options = options || {};

    __id += 1;
    var id = "r" + __id;
    options.id = id;

    var cmp = ReactLoader.load(component, options);

    console.log("RETURNING", cmp);
    cmp.isReact = true;
    cmp.id = id;
    return cmp;
  }
};


global.$R = ReactLoader.build;
module.exports = ReactLoader;
module.exports.install = function() {
  add_packager();
};

