"use strict";

var connect = require('connect');
var config = require('./config');
var store = require_core("server/store");
var session = require("express-session");

var _session;

var SESSION_SECRET = config.session_secret || 'keyboard cat';


module.exports = {
  install: function(app) {
    var cookieSession = require('cookie-session');
    var persistence_store = store.get();

    if (!_session) {
      if (persistence_store) {
        try {
          _session = session({
            secret: SESSION_SECRET,
            store: persistence_store
          });

          app.use(_session);

          return;
        } catch(e) {
          console.log("Session store and session are incompatible");
          console.log("Error is:", e);
        }
      } 

    }

    _session = cookieSession({
      secret: SESSION_SECRET
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
