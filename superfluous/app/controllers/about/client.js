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
    this.$el.find(".toc").removeClass("com");
    this.$el.find(".expander")
      .html("Collapse")
      .addClass("collapser")
      .removeClass("expander");
  },
  handle_collapse_toc: function() {
    this.$el.find(".toc").addClass("com");
    this.$el.find(".collapser")
      .html("Expand")
      .addClass("expander")
      .removeClass("collapser");
  }
};
