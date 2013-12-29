"use strict";

module.exports = {
  events: {
    "click .expander" : "handle_expand_toc",
    "click .collapser" : "handle_collapse_toc"
  },
  handle_sidebar: function(sidebar) {
    console.log("Loaded sidebar on client", sidebar);
  },
  handle_expand_toc: function() {
    this.$el.find(".toc").removeClass("hom");
    this.$el.find(".expander")
      .html("Collapse")
      .addClass("collapser")
      .removeClass("expander");
  },
  test_socket: function(arg, darg) {
    console.log("Using socket bridge", arg, darg);
  },
  handle_collapse_toc: function() {
    this.$el.find(".toc").addClass("hom");
    this.$el.find(".collapser")
      .html("Expand")
      .addClass("expander")
      .removeClass("collapser");
  }
};
