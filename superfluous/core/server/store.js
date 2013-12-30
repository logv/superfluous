"use strict";

var config = require('./config');
var connect = require('connect');
var package_json = require_core("../package.json");
var app_name = package_json.name;
var _store;

module.exports = {
  install: function() {
    var url = config.backend && config.backend.db_url;
    var MongoStore = require('connect-mongo')(connect);
    _store = new MongoStore({url: url, db: app_name, auto_reconnect: true } );
  },
  get: function() {
    return _store;
  },
  set: function(s) {
    _store = s;
  },
};
