"use strict";

require("app/client/react");

module.exports = {
  click_handler_uno: function() {
    console.log("Handling a click");
  },
  load: function(todo_el) {
    console.log("Loaded React todomvc instance", todo_el);
  },
  init: function() {

  }
};
