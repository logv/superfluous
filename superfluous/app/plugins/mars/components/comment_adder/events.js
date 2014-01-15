"use strict";

module.exports = { 
  // Component event handling goes here
  // This is purposefully kept separate from
  // the main component file, since it has code
  // that is generally not relevant to the server.
  events: {
    "submit" :  "handle_add_comment"
  },

  handle_add_comment: function(e) {
    var form = this.$el.find("form");
    var serialized = form.serializeArray();
    serialized.push({ "name" : "page", "value" : this.page });
    serialized.push({ "name" : "pageid", "value" : this.pageid });
    serialized.push({ "name" : "index", "value" : this.paragraph_index });
    serialized.push({ "name" : "paragraph", "value" : this.paragraph_start });
    SF.controller().trigger("add_comment", serialized, this);
    e.preventDefault();

    this.saving();
  }
};
