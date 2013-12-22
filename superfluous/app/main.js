"use strict";

var store = require_core("server/store");

module.exports = {
  setup_packager: function() {
    // sets up the packager endpoint for react
    require_app("server/react").install();
  },
  setup: function() {
    console.log("Main setup stuff, something, something");
  }
};
