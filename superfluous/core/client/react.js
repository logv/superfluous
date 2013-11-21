"use strict";

require("core/static/vendor/react/react");
var _reacts = window.bootloader.reacts;

module.exports = {
  instantiate: function(component, options) {
    // gotta require that react component, somehow
    window.bootloader.react(component, function() {
      if (_reacts[component]) {
        var el = window.document.getElementById(options.id);
        var instance = new _reacts[component](options);

        var rid = $(el).find("[data-reactid]").data("reactid");
        React.renderComponent(instance, el);
      }


    });
  },
  build: function(component, options, callback) {
    window.bootloader.react(component, function() {
      var div = $("<div />");
      if (_reacts[component]) {
        var instance = new _reacts[component](options, { });

        React.renderComponent(instance, div[0]);
      }

      callback({
        $el: div
      });
    });

  }
};

window.$R = module.exports.build;
