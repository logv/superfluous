"use strict";

module.exports = {
  events: {
    "click a.bump" : "handle_bump"
  },
  init: function() {
  },
  socket: function(socket) {
    var self = this;
    socket.on("query_results", function(res) {
      self.update_results(res);
    });

    socket.on("query_bump", function(res) {
      self.update_results({ total: res.total });
    });
  },
  update_results: function(data) {
    if (this.$el) {
      if (typeof data.socket !== "undefined") {
        this.$el.find(".results .socket_count").html(data.socket);
      }
      if (typeof data.total !== "undefined") {
        this.$el.find(".results .total_count").html(data.total);
      }
    }
  },
  handle_bump: function() {
    SF.socket().emit("bump");
    SF.socket().emit("query");
  }
};
