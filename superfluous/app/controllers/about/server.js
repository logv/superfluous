"use strict";

module.exports = {
  routes: {
    "" : "index"
  },

  // ctx is the request local Storage. other server functions can access
  // variables on it via the 'context' module.
  // api is the core API for building pages
  index: function(ctx, api) {
    // use $C to create a component.
    var sidebar = $C("about_sidebar", { client_options: { div: ".contents" }});

    // Some components don't have any UI associated with them.
    // The BG picture changer on the about page doesn't have any View,
    // so we just call 'marshall' to send it to the client.
    $C("bg_scroller", { }).marshall();
    this.set_title("Superfluous");
    this.set_fullscreen(true);

    var template_str = api.template.render("controllers/about.html.erb", {
      template_code: api.readfile("app/static/templates/controllers/demo.html.erb"),
      client_code: api.readfile("app/controllers/demo/client.js"),
      server_code: api.readfile("app/controllers/demo/server.js"),
      about_server_code: api.readfile("app/controllers/about/server.js"),
      about_client_code: api.readfile("app/controllers/about/client.js"),
      render_sidebar: sidebar.toString
    });


    api.bridge.controller("about", "handle_sidebar", sidebar);
    api.page.render({ content: template_str, socket: true});
  },
  socket: function(s) { 
    s.bridge.controller("about", "test_socket", "foo", "bar");
    s.log("hello!");
  }
};
