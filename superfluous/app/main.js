"use strict";

var store = require_core("server/store");
var config = require_core("server/config");
var connect = require('connect');

module.exports = {
  setup_packager: function() {
    // sets up the packager endpoint for react
    require_app("server/react").install();
  },
  setup_app: function() {
    console.log("Main setup stuff, something, something");
  },
  setup_store: function() {
    var package_json = require_core("../package.json");
    var app_name = package_json.name;
    var url = config.backend && config.backend.db_url;
    var MongoStore = require('connect-mongo')(connect);
    var store = new MongoStore({url: url, db: app_name, auto_reconnect: true } );
    require_core("server/store").set(store);
    return true;
  },
  setup_request: function(req) {
    // Filter out logging packager requests
    if (!req.path.indexOf("/pkg")) {
      return;
    }

    console.log("Handling Request to", req.path, req.query);
  },
  setup_cache: function(app) {
    // setup static helpers
    var oneDay = 1000 * 60 * 60 * 24;
    var oneYear = oneDay * 365;
    app.use(connect.static('react/', { maxAge: oneYear }));
  }
};
