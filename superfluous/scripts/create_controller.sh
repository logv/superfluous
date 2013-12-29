#!/bin/bash

COMPONENT=$1

mkdir -p app/controllers/${COMPONENT}/static/templates/partials/${COMPONENT}
mkdir -p app/controllers/${COMPONENT}/static/templates/${COMPONENT}
mkdir -p app/controllers/${COMPONENT}/static/styles/
mkdir -p app/controllers/${COMPONENT}/static/images/

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
  routes: {
    "" : "index",
  },

  index: function(ctx, api) {
    var template_str = api.template.render("${COMPONENT}/${COMPONENT}.html.erb", {});
    api.page.render({ content: template_str});
  },

  socket: function() {}
};
SERVER

mkdir -p app/static/templates/controllers/
cat > app/controllers/${COMPONENT}/templates/${COMPONENT}/${COMPONENT}.html.erb << TEMPLATE


<div class="container">
  <h1 class="col-md-8">Welcome to <b>${COMPONENT}</b>'s controller template</h1>

  <div class="col-md-8">
    (This main layout is located in <b>app/controllers/${COMPONENT}/templates/${COMPONENT}.html.erb</b>)
  </div>


  <div class="col-md-8">
    <%= render_partial("${COMPONENT}/private.html.erb") %>
  </div>
</div>

TEMPLATE

cat > app/controllers/${COMPONENT}/templates/partials/${COMPONENT}/private.html.erb << PARTIAL

<h2>This is a partial</h2>

It's your friend :-) It's located in
<b>app/controllers/${COMPONENT}/templates/partials/private.html.erb</b>

PARTIAL
