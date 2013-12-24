"use strict";

require("app/client/react");
require("core/client/backbone");

module.exports = {
  click_handler_uno: function() {
    console.log("Handling a click");
  },
  load: function(todo_el, datas, sidebar) {
    console.log("Loaded React todomvc instance", todo_el);
    console.log("Loaded backbone collection", datas);
    console.log("Loaded sidebar", sidebar);
    todo_el.props.todos = datas;
  },
  init: function() {

  }
};
