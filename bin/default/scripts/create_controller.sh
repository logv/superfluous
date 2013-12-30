#!/bin/bash

COMPONENT=$1

mkdir -p app/controllers/${COMPONENT}/static/templates/partials/${COMPONENT}/
mkdir -p app/controllers/${COMPONENT}/static/templates/${COMPONENT}/
mkdir -p app/controllers/${COMPONENT}/static/styles/${COMPONENT}/
mkdir -p app/controllers/${COMPONENT}/static/images/${COMPONENT}/

cat > app/controllers/${COMPONENT}/client.js << CLIENT
"use strict";

module.exports = {
  events: {

  },
  init: function() {

  }
};
CLIENT

cat > app/controllers/${COMPONENT}/server.js << SERVER
"use strict";

var controller = require_core("server/controller");
// Helpers for serialized form elements
var value_of = controller.value_of,
    array_of = controller.array_of;
    

module.exports = {
  // If the controller has assets in its subdirs, set is_package to true
  is_package: false,
  routes: {
    "" : "index",
  },

  index: function(ctx, api) {
    var template_str = api.template.render("controllers/${COMPONENT}/${COMPONENT}.html.erb", {});
    api.page.render({ content: template_str});
  },

  socket: function() {}
};
SERVER

mkdir -p app/static/templates/controllers/${COMPONENT}
cat > app/static/templates/controllers/${COMPONENT}/${COMPONENT}.html.erb << TEMPLATE


<div class="container">
  <h1 class="col-md-8">Welcome to <b>${COMPONENT}</b>'s controller template</h1>

  <div class="col-md-8">
    (This main layout is located in <b>app/static//templates/controllers/${COMPONENT}/${COMPONENT}.html.erb</b>)
  </div>


  <div class="col-md-8">
    <%= render_partial("${COMPONENT}/shared.html.erb") %>
  </div>
</div>

TEMPLATE

mkdir -p app/static/templates/partials/${COMPONENT}
cat > app/static/templates/partials/${COMPONENT}/shared.html.erb << PARTIAL

<h2>This is a partial</h2>

It's your friend :-) It's located in
<b>app/static/templates/partials/${COMPONENT}/shared.html.erb</b>

PARTIAL
