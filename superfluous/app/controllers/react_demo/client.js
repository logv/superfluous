"use strict";

require("app/client/react");
require("core/client/backbone");
var models = require("app/controllers/react_demo/models");

module.exports = {
  load: function(todo_el, datas, sidebar) {
    console.log("Loaded React todomvc instance", todo_el);
    console.log("Loaded sidebar", sidebar);

    // doo de doo, overriding backbone sync
    console.log("WARNING: Overriding Backbone.sync for demo purposes!");
    Backbone.sync = function(method, model, options) { 
      options.success(model, {}, options); 
    };


    var collection  = new models.TodoList();
    collection.reset(datas.toJSON());
    console.log("Loaded backbone collection", collection);

    todo_el.props.todos = collection;
  },
  init: function() {

  }
};
