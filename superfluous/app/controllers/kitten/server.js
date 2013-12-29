"use strict";

// TODO: if this is a single page app, streamline the process of rendering the
// template, fetching data and hooking up views into a simpler idea
function index(ctx, api) {
  var async_button = function(options) {
      var button = $C("button", options);
      return api.page.async(function(flush) {
        _.delay(function() {
          flush(button.toString());
        }, (Math.random() * 1000) + 1000);
    });
  };

  api.template.add_stylesheet("scrollers.css");

  this.set_title("kitty browser");

  var logout_button = $C("button", {
      name: "log out",
      class: "btn-small",
      delegate: {
        "click" : "handle_logout"
      }
    });

  var render_sidebar = function() {
    return api.template.partial("kitten/sidebar.html.erb", {
      sidebar_notice: api.page.async(function(flush) {
        _.delay(function() {
          flush("<div class='alert'>here it is. this is where sidebar details could show up.</div>");
        }, 3000);
      })
    });
  };

  var kitten = this.get_shared_value("kitten") || 1;
  var user = ctx.req.user;
  var username;
  if (user) {
    username = user.username;
  }

  var template_str = api.template.render("kitten.html.erb", {
    render_button1: async_button({ name: "Sync", behavior: "kitten/go_button", className: "btn btn-primary" }),
    render_button2: async_button({ name: "Reset", behavior: "kitten/reset_button", className: "btn btn-primary"}),
    render_sidebar: render_sidebar,
    kitten: kitten,
    username: username,
    render_logout_button: logout_button.toString
  });

  api.page.render({content: template_str, socket: true});
}

var __id = 0;
__id++;

var __nid = 0;

module.exports = {
  is_package: true,
  index: index, // should be wrapped in auth.require_user
  routes: {
    "": "index"
  },

  realtime: function(io) {
    setInterval(function() {
      io.emit("kitten", {
        id: Math.round(Math.random() * 10000),
        active: Date.now()
      });

    }, (Math.random() * 10000) + 3000);
  },

  // we can persist the kitten to db
  socket_cache_whitelist: [
    "kitten"
  ],

  socket: function(socket) {
    var id = __id++;

    socket.emit("init", {
      // means that server just learned about this socket
      id: id
    });

    socket.emit("kitten", {
      id: id,
      active: Date.now()
    });
  }
}
