/**
 * This module loads the configuration for the superfluous app.
 *
 * It first loads config/config.js for a base set of configuration options.
 * It then loads config/override.js for any local overrides (this file should be placed .gitignore)
 * It then loads config/${ENV}.js (this should be something like 'localhost', 'production', etc
 *
 * When requiring this module, the cascading objects will be available as
 * properties on it.
 *
 * @class config (server)
 * @module Superfluous
 * @submodule Server
 **/

var readfile = require_core("server/readfile");
var path = require("path");
var _config = {};

var env = process.env.ENV;
var RELEASE = process.env.RELEASE;

if (!RELEASE) {
  console.log("WARNING: Running server without a $RELEASE - assets will be served in development mode!");

}

var _loaded = {};
function load_config(base_path, add_supplements) {
  base_path = path.resolve(base_path);
  if (_loaded[base_path]) {
    return;
  }

  console.log("CONFIG: LOADING CONFIG DIR FROM", base_path);
  _loaded[base_path] = true;

  var ret = {};


  try {
    var main_config = path.join(base_path, "config/config");
    var base_config = require(main_config);
    _.extend(ret, base_config);
    console.log("CONFIG: Using config in config/config");
  } catch (e) {
    console.log("CONFIG: Main config error:", e);
  }


  if (!add_supplements) {
    _.extend(_config, ret);
    return;
  }

  var override;

  try {
    var override_config = path.join(base_path, "config/override");
    override = require(override_config);
    _.extend(ret, override);
    console.log("CONFIG: Adding overrides from config/override.js");
  } catch(e) {
    console.log("CONFIG: Couldn't load overrides in config/override.js");
  }

  if (env) {
    var env_config = path.join(base_path, "config", env);
    try {
      override = require(env_config);
      _.extend(ret, override);
      console.log("CONFIG: Using ENV overrides in config/" + env);
    } catch(e) {
      console.log("CONFIG: Couldn't load env conf from config/" + env);
    }
  }

  // We apply our own config to global config before
  // recursing into config_dir
  _.extend(_config, ret);

  // LOADING ret.config_dir + config/config.js
  if (ret.config_dir) {
    var resolved = path.resolve(ret.config_dir);
    if (resolved != base_path) {
      readfile.register_path(ret.config_dir);
      load_config(ret.config_dir, add_supplements);
    }
  }


}

var cwd = process.cwd();
load_config(cwd, true /* add supplemental configs, too */);

_config.RELEASE = RELEASE;
_config.APP_DIR = path.join(cwd, "app");
_config.CORE_DIR = path.relative(cwd, path.join(__dirname, ".."));

console.log("CONFIG: FINAL OBJ: ", _config);
module.exports = Object.freeze(_config);
