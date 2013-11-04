var page = require_core("server/page");
var template = require_core("server/template");

module.exports = {
  routes: {
    "" : "index",
  },

  index: function() {
    var template_str = template.render("controllers/home.html.erb");
    page.render({ content: template_str});
  },

  socket: function() {}
};
