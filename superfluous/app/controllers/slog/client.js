"use strict";

require("core/client/component");

module.exports = {
  is_package: true,
  events: {
    "click tr" : "handle_log_click"
  },
  init: function() {
    this.slogEl = this.$page.find(".slog table");
    this.trigger('slog');
  },
  add_messages: function(msgs) {
    var self = this;
    self.do_when(self.slogEl, 'slog', function() {
      _.each(msgs, function(msg) {
        var row = $("<tr class='alert'/>");

        row.append($("<td class='col-md-1'/>")
          .html(msg.type || "&nbsp;")
          .addClass("label")
          .addClass("label-" + msg.type));

        row.append($("<td class='col-md-3'/>").html((new Date(msg.ts)).toLocaleString()));
        row.append($("<td class='col-md-12'/>")
          .addClass("log")
          .text(msg.msg));
        self.slogEl.prepend(row);
      });
    });
  },
  socket: function(s) {
    var self = this;
    s.on("msgs", function(msgs) {
      self.add_messages(msgs);
    });

    setInterval(function() {
      s.emit("since", function(msgs) {
        self.add_messages(msgs);
      });
    }, 1000);
  },
  handle_log_click: function(evt) {
    var tgt = $(evt.target);
    var row = tgt.parent("tr");
    var text = row.find(".log").html();

    $C("modal", { body: text, title: "Full Log"});
  }
};
