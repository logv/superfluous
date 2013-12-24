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
    var model = new Backbone.Model();
    var react_el = global.$R("todomvc", {});
    api.template.add_stylesheet("todomvc_global");
    var template_str = api.template.render("controllers/react_demo.html.erb", {
      todo_el: react_el.toString() 
    });
    api.bridge.controller("react_demo", "load", react_el);
    api.page.render({ content: template_str});
  },

  socket: function() {}
};
