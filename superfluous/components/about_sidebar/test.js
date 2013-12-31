"use strict";

var test_helper = require("superfluous").test_helper;
test_helper.init();

var assert = require("assert");
var component_name = "about_sidebar";

describe(component_name, function() {
  test_helper.setup_server(function() {
    var component = require_core("server/component");

    it("builds on the server", test_helper.wrap(function(done) {
      component.build("about_sidebar", {}, function(cmp) {
        assert.notEqual(cmp, null);
        assert.notEqual(cmp.$el, null);
        done();
      });
    }));

    it("renders on the server", test_helper.wrap(function(done) {
      component.build("about_sidebar", {}, function(cmp) {
        assert.notEqual(cmp.$el.html(), null);

        done();
      });
    }));
  });
});
