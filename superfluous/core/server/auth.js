/** 
 *
 * The core Server module in superfluous contains code related to routing,
 * authentication, page generation, template rendering and input handling.
 *
 * @module Superfluous
 * @submodule Server
 */

/**
 * @class auth (server)
 * @private
 */

"use strict";

var db = require_core("server/db");

var session = require_core("server/session");
var context = require_core("server/context");
var config = require_core("server/config");
var readfile = require("./readfile");
var session = require_core("server/session");
var parseCookie = require("express").cookieParser(session.secret());

var https = require('https');

module.exports = {

  /**
   * After the http and socket servers are setup, the app and socket server are
   * passed to the install method, so they be hooked together via auth.
   *
   *
   * @private
   * @method install
   * @param {Object} express_app
   * @param {Object} socket_server (primus, socket.io, etc)
   */
  install: function(app, io) {
    this.app = app;
    this.io = io;


    io.authorize(function(handshake_data, cb) {
      var that = this;
      var cookie = handshake_data.headers.cookie;
      parseCookie(handshake_data, null, function() {
        var sid = handshake_data.signedCookies['connect.sid'];
        var store = session.store();

        if (sid) {
          try {
            store.get(sid, function(err, session) {
              if (err) {
                return cb(err, false);
              }

              handshake_data.headers.sid = sid;
              handshake_data.headers.session = session;
              cb(null, true);
            });
          } catch(e) {
            cb(e, false);
          }
        }

      });
    });
  },

  setup_ssl_server: function(app) {
    var https_options;
    if (config.ssl) {
      try {
        var privateKey = readfile(config.ssl.key);
        var certificate = readfile(config.ssl.certificate);

        https_options = {
          key: privateKey,
          cert: certificate
        };
      } catch(e) { }


      if (!privateKey || !certificate) {
        console.log("Warning: couldn't read SSL certs and keys, please run scripts/setup_certificates.sh");
      }

    }

    var https_server;
    if (https_options && https_options.key && https_options.cert) {
      https.globalAgent.maxSockets = config.max_https_sockets;
      https_server = https.createServer(https_options, app);
    }

    return https_server;
  }
};

