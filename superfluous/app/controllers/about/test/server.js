"use strict";

var test_helper = require("superfluous").test_helper;
test_helper.init();
var assert = require("assert");

describe("About Controller", function() {
  it("should render the about page", function(done) {
    test_helper.test_route("about", "index", [], function(rendered_page) {
      // we've only verified that it contains the words 'html' and 'superfluous', so
      // far...
      assert.notEqual(rendered_page.indexOf("html"), -1);
      assert.notEqual(rendered_page.indexOf("superfluous"), -1);
      done();
    });

  });

  it("should do socket stuff", function(done) {
    test_helper.test_socket("about", function(s, do_socket_setup) {
      var called, logged;
      s.on("foo", function() {
        called = true;
      });

      s.on("__log", function() {
        logged = true;
      });

      do_socket_setup(function() {
        assert.equal(called, true);
        assert.equal(logged, true);
        done();
      });
    });
  });
});
