"use strict";

var config = require('./config');
var session = require('express-session');
var MemoryStore = require('memorystore')(session);

var _store;
module.exports = {
  install: function() {
    _store = new MemoryStore({});
  },
  get: function() {
    return _store;
  },
  set: function(s) {
    _store = s;
  },
};
