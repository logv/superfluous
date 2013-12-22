"use strict";

var controller = require_core("server/controller");
var page = require_core("server/page");
var template = require_core("server/template");

// Helpers for serialized form elements
var value_of = controller.value_of,
    array_of = controller.array_of;
    

module.exports = {
  routes: {
    "" : "index",
  },

  index: function() {
    var model = new Backbone.Model();
    var react_el = $R("todomvc", {});
    template.add_stylesheet("todomvc_global");
    var template_str = template.render("controllers/react_demo.html.erb", {
      todo_el: react_el.toString() 
    });
    page.render({ content: template_str});
  },

  socket: function() {}
};
