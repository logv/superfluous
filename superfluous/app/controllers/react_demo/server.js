"use strict";

var controller = require_core("server/controller");

// Helpers for serialized form elements
var value_of = controller.value_of,
    array_of = controller.array_of;
    

module.exports = {
  routes: {
    "" : "index",
  },

  index: function(ctx, api) {
    var react_el = global.$R("todomvc", {});
    var sidebar = $C("about_sidebar", { client_options: { div: ".contents" }});
    api.template.add_stylesheet("todomvc_global");
    var template_str = api.template.render("controllers/react_demo.html.erb", {
      todo_el: react_el.toString() 
    });

    var todos = new Backbone.Collection([ 
      { an_element: "foo" },
      { var_blah: "baz" }
    ]);

    // rememember to marshall components that don't get rendered!
    sidebar.marshall();
    api.bridge.controller("react_demo", "load", react_el, todos, sidebar);
    api.page.render({ content: template_str});
  },

  socket: function() {}
};
