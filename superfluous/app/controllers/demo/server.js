"use strict";

var page = require_core("server/page");
var template = require_core("server/template");

var _total = 0;
module.exports = {
  routes: {
    "" : "index"
  },

  index: function() {
    var template_str = template.render("controllers/demo.html.erb", { total: _total });
    page.render({ content: template_str, socket: true});
  },

  socket: function(socket) {
    console.log("A new client has attached to the server");
    var counter = 0;
    var self = this;

    function get_query_results() { 
      return { socket: counter, total: _total };
    }

    socket.on("bump", function(args) {
      _total += 1;
      counter += 1;

      socket.broadcast.emit("query_bump", get_query_results());
    });

    socket.on("query", function(cb) {
      socket.emit("query_results", get_query_results());
    });

    // Some initialization data
    socket.emit("query_results", get_query_results());
  }
};
