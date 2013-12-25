"use strict";

var store = require_core("server/store");
var connect = require('connect');

module.exports = {
  setup_packager: function() {
    // sets up the packager endpoint for react
    require_app("server/react").install();
  },
  setup: function() {
    console.log("Main setup stuff, something, something");
  },
  setup_cache: function(app) {
    // setup static helpers
    var oneDay = 1000 * 60 * 60 * 24;
    var oneYear = oneDay * 365;
    app.use(connect.static('react/', { maxAge: oneYear }));
  }
};
