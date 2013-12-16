/**
 * The router hooks up the routes on the server to the express app. It pull the
 * routes off the bootloader, as well as any controllers listed in routes.json
 * and creates their 'routes' and 'post_routes' handlers on behalf of the controller.
 *
 * @class router (server)
 * @module Superfluous
 * @submodule Server
 */

"use strict";

var _ = require_vendor("underscore");
var context = require("./context");
var load_controller = require("./controller").load;
var load_core_controller = require("./controller").core;

module.exports = {
  collect: function(controllers) {
    // Takes an enumerable of controller names, loads the controllers and then
    // harvests their routes
    var routes = [];

    var inst = load_core_controller("bootloader");
    function run_route(handler) {
      return function() {
        context("controller", "bootloader");
        inst[handler].apply(inst, arguments);
      };
    }

    _.each(inst.routes, function(handler, subpath) {
      routes.push({
        route: "/pkg" + subpath,
        method: "get",
        handler: run_route(handler)
      });
    });



    _.each(controllers, function(controller, path) {
      // strip leading and trailing slashes in this path!
      var stripped_path = path
        .replace(/^\/*/, '')
        .replace(/\/*$/, '');
      var inst = load_controller(controller);

      function run_route(handler) {
        return function() {
          context("controller", controller);
          inst[handler].apply(inst, arguments);
        };
      }

      _.each(inst.routes, function(handler, subpath) {
        routes.push({
          route: path + subpath,
          method: "get",
          handler: run_route(handler)
        });
      });

      _.each(inst.post_routes, function(handler, subpath) {
        routes.push({
          route: path + subpath,
          method: "post",
          handler: run_route(handler)
        });
      });
    });

    return routes;
  }

};
