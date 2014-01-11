"use strict";

require("app/client/react");
module.exports = {
  load: function(todo_el, datas, sidebar) {
    console.log("Loaded React todomvc instance", todo_el);
    console.log("Loaded sidebar", sidebar);

    // doo de doo, overriding backbone sync
    console.log("WARNING: Overriding Backbone.sync for demo purposes!");
    Backbone.sync = function(method, model, options) { 
      options.success(model, {}, options); 
    };


  },
  init: function() {

  }
};
