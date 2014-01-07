"use strict";

module.exports = {
  setup_app: function() {
    console.log("Main setup stuff, something, something");
    require_app("plugins/slog/server").install();
  },
  setup_request: function(req) {
    console.log("Handling request", req.path, req.query, req.params);
  }
};
