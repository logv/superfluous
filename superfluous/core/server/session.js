"use strict";

var express = require('express');
var config = require('./config');
var store = require_core("server/store");

var _session;

var SESSION_SECRET = config.session_secret || 'keyboard cat';


module.exports = {
  install: function(app) {
    _session = express.session({
        secret: SESSION_SECRET,
        store: store.get()
      });

    app.use(_session);

  },
  get: function() {
    return _session;
  },
  set: function(s) {
    _session = s;
  },
  secret: function() {
    return SESSION_SECRET;
  },
  store: function() {
    return store.get();
  }
};
