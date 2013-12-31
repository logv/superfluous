"use strict";

function gracefulShutdown(io, cb) {
  var socket = require_core("server/socket");
  var sockets = socket.get_open_sockets();
  console.log("we still have", sockets.length, "sockets open, shutting em down forcefully");
  _.each(sockets, function(socket) {
    socket.emit("__refresh", { auth: parseInt(Math.random() * 120098, 10)});
  });

  cb();
}

module.exports = {
  install: function(io) {
    process.once('SIGUSR2', function () {
      gracefulShutdown(io, function () {
        process.kill(process.pid, 'SIGUSR2'); 
      });
    });
  }
};
