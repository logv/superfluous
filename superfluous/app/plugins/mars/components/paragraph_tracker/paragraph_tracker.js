"use strict";

module.exports = {
  tagName: "div",
  className: "",
  defaults: {
    content: "default content"
  },
  client: function(options) {
    // Detect when the user becomes idle vs. is active. Watch for scrolling, etc
    var paragraphs = $("p");
    var num_paragraphs = paragraphs.length;
    var pagename = options.client_options.page;
    var pageid = options.client_options.pageid;
    var session = {};
    session.count = num_paragraphs;
    session.idle = 0;

    var idle_time = 0;
    var current_tick = 0;

    var color_picker = this.helpers['vendor/jquery.colors'].get_color;
    var color = color_picker(options.client_options.sid || Math.abs(Math.random()));

    // Poll the page every second and keep track of which paragraphs are visible
    function count_visible_paragraphs() {
      if (window.document.hidden) {
        return;
      }

      current_tick += 1;
      idle_time += 1;

      session.ticks = current_tick;
      session.active = session.ticks - session.idle;

      if (current_tick % 5 === 0) {
        var socket_data = {
          session: session,
          page: pagename,
          pageid: pageid
        };
        SF.socket().emit("timespent", socket_data);
      }

      // don't count the time if the user has been idle
      if (idle_time < 30) {
        var vis_paragraphs = $("p").filter(function() { return $(this).isOnScreen(); });
        _.each(vis_paragraphs, function(p) {
          var $p = $(p);
          var index = paragraphs.index($p);
          // locate where in the text these words are. right?
          session[index] = (session[index]||0) + 1;
        });
      } else {
        session.idle += 1;
      }


      setTimeout(function() {
        count_visible_paragraphs();
      }, 1000);
    }


    count_visible_paragraphs();

    $(window.document).scroll(_.throttle(function (e) {
      idle_time = 0;
    }, 100));
    $(window.document).mousemove(_.throttle(function (e) {
      idle_time = 0;
    }, 100));
    $(window.document).keypress(function (e) {
      idle_time = 0;
    });
  }
};
