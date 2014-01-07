"use strict";

module.exports = {
  routes: {
    "" : "index"
  },

  index: function(ctx, api) {
    var template_str = api.template.render("controllers/home.html.erb");
    var async_work = api.page.async(function(flush) {
      api.template.add_stylesheet("tomorrow-night-bright");
      api.bridge.call("app/static/vendor/highlight.pack", "initHighlighting");
      flush();
    });
    async_work();
    api.page.render({ content: template_str});
  },

  socket: function() {}
};
