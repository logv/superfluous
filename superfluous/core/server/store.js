"use strict";

var config = require('./config');
var express = require('express');
var package_json = require_core("../package.json");
var app_name = package_json.name;
var _store;

module.exports = {
  install: function() {
    var MongoStore = require('connect-mongo')(express);
    _store = new MongoStore({url: config.backend.db_url, db: app_name, auto_reconnect: true } );
  },
  get: function() {
    return _store;
  },
  set: function(s) {
    _store = s;
  },
};
