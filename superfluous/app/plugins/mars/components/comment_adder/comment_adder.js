"use strict";

module.exports = {
  tagName: "div",
  className: "",
  defaults: {
    content: ""
  },
  initialize: function(options) {
    this.paragraph_index = options.index;
    this.page = options.page;
    this.pageid = options.pageid;

    this.paragraph_start = options.paragraph.substr(0, 100);
  },
  client: function(options) {
    var client_options = options.client_options;
  },
  saving: function() {
    this.$el.find("form").slideUp();

    this.form = this.$el.find("form");

    this.$el.empty();
    this.$el.append("<div class='alert mtl'>saving your message...</div>");
  },

  saved: function() {
    this.$el.empty();

    this.$el.append("<div class='alert mtl'>Thanks! your message has been saved</div>");
  },
  close: function() {
    var self = this;
    self.$el.slideUp(function() {
      self.$el.remove();
      self.trigger("closed");
    });
  }
};
