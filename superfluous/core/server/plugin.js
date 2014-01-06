"use strict";

var readfile = require_core("server/readfile");
var component = require_core("server/component");
var path_ = require("path");
var config = require_core("server/config");

var _registered_paths = {};
function register_path(tl_path) {
  readfile.register_path(path_.join(tl_path, "static"));
  component.register_path(tl_path);

  _registered_paths[tl_path] = true; 
}

function get_registered_paths() {
  return _.keys(_registered_paths);
}

function register_plugin(plugin) {
  console.log("'" + plugin + "' plugin is packaged, adding it to static asset path");
  register_path(path_.join("app", "plugins", plugin));
}

function register_controller(controller) {
  console.log("'" + controller + "' controller is packaged, adding it to static asset path");
  register_path(path_.join("app", "controllers", controller));
}

var path = require("path");
var ROOT_RE = new RegExp("^/?ROOT/");
function get_base_dir(controller_include) {

  var stripped_include = controller_include.replace(ROOT_RE, "");
  var paths = ["app/controllers", "app/plugins"];
  var resolved;
  _.each(paths, function(p) {
    if (resolved) {
      return;
    }

    var full_path = path.join(p, stripped_include);
    if (readfile(full_path + ".js")) {
      resolved = full_path;
    }
  });

  return resolved;
}

module.exports = {
  register_plugin: register_plugin,
  register_controller: register_controller,
  get_registered_paths: get_registered_paths,
  get_base_dir: get_base_dir
};
