"use strict";

var store = require_core("server/store");

module.exports = {
  setup: function() {
    console.log("Main setup stuff, something, something");
  },
  setup_store: function() {
    store.set(null);
    return true;
  }
};
