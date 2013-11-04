var page = require_core("server/page");
var template = require_core("server/template");
var auth = require_core("server/auth");

module.exports = {
  routes: {
    "" : "index",
  },

  index: function() {
    var template_str = template.render("controllers/hello.html.erb");
    page.render({ content: template_str});
  },

  realtime: function() {},
  socket: function() {}
};
