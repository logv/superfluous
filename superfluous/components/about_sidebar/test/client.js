"use strict";

var component_name = "about_sidebar";

describe(component_name, function() {
    it("builds on the client", function(done) {
      $C(component_name, { name: "first_button", client_options: { div: ".contents" }}, function(cmp) {
        assert.notEqual(cmp, null);
        assert.notEqual(cmp.$el, null);
        done();
      });
    });
    it("renders on the client", function(done) {
      $C(component_name, { name: "first_button"}, function(cmp) {
        assert.notEqual(cmp, null);
        assert.notEqual(cmp.$el, null);
        done();
      });
    });
});