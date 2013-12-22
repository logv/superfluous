"use strict";

require("app/static/vendor/react/react");
var _reacts = window.bootloader.reacts;

var _reacts = {};
var _definitions = {};
function define_react(component, definition) {
  var first_define = !_reacts[component];

  if (!definition.schema.no_redefine || first_define) {
    var schema = JSON.parse(definition.schema);
    definition.schema = schema;
    _reacts[component] = window.bootloader.raw_import(definition.main, "react/" + component + "/" + component);
    _definitions[component] = definition;
      
    if (definition.style) {
      window.bootloader.inject_css(definition.style);
    }
  }
}

register_component_packager("react", _reacts, define_react);
module.exports = {
  instantiate: function(component, options) {
    // gotta require that react component, somehow
    window.bootloader.react(component, function() {
      if (_reacts[component]) {
        window.bootloader.css(_definitions[component].schema.styles, function() {
          var el = window.document.getElementById(options.id);
          var instance = new _reacts[component](options);

          window.React.renderComponent(instance, el);
        });
      }
    });
  },
  build: function(component, options, callback) {
    window.bootloader.react(component, function() {
      var div = $("<div />");
      if (_reacts[component]) {
        window.bootloader.css(_definitions[component].schema.styles, function() {
          var instance = new _reacts[component](options, { });
          window.React.renderComponent(instance, div[0]);

          callback({
            $el: div
          });
        });
      }
    });
  }
};

window.$R = module.exports.build;
