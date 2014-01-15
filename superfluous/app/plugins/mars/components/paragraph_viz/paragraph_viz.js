"use strict";


module.exports = {
  tagName: "div",
  className: "",
  defaults: {
    content: "default content"
  },
  render: function() {
  },
  client: function(options) {
    var result = options.client_options.result;
    var session = result.data.session;
    var total = session.count;
    var cell_count;
    var cells = $("<div/>");
    var index;
    var helpers = this.helpers;
    var color_picker = this.helpers['vendor/jquery.colors'].get_color;

    for (index = 0; index < total; index++) {
      cell_count = session[index] || 0;
      var opacity = Math.round(cell_count / parseFloat(session.active) * 100.0) / 100;
      var color = color_picker(result.sid);
      var div = $("<div />")
        .html("<div style='width: 10px; height: 20px' />")
        .css("background-color", color)
        .css("opacity", opacity || "0.001");

      cells.append(div);
     
    }

    this.$el.find(".viz").append(cells);
      
  }
};
