"use strict";

var controller = require_core("server/controller");

// Helpers for serialized form elements
var value_of = controller.value_of,
    array_of = controller.array_of;


var models = require_app("controllers/react_demo/models");

module.exports = {
  routes: {
    "" : "index",
  },

  index: function(ctx, api) {
    var todos = new models.TodoList([
      { title: "build a bigger React site", completed: false, editing: false, id: 4 },
      { title: "sync backbone collection to server", completed: false, editing: false, id: 5 },
      { title: "tie Backbone & React together", completed: true, editing: false, id: 3 },
      { title: "add a React Component", completed: true, editing: false, id: 2 },
      { title: "learn how to use React", completed: true, editing: false, id: 1 },
    ]);

    var react_el = global.$R("todomvc", { todos: todos, editing: {} });
    var sidebar = $C("about_sidebar", { client_options: { div: ".contents" }});
    api.template.add_stylesheet("todomvc_global");
    var template_str = api.template.render("controllers/react_demo.html.erb", {
      todo_el: react_el.toString()
    });

    // rememember to marshall components that don't get rendered!
    sidebar.marshall();
    api.bridge.controller("react_demo", "load", react_el, todos, sidebar);
    api.page.render({ content: template_str});
  },

  socket: function() {}
};
