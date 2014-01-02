"use strict";

var test_helper = require("superfluous").test_helper;
test_helper.init();
var assert = require("assert");

describe("Demo Controller", function() {
  it("should render the index page", function(done) {
    test_helper.test_route("demo", "index", [], function(rendered_page) {
      // we've only verified that it contains the words 'html' and 'superfluous', so
      // far...
      assert.notEqual(rendered_page.indexOf("html"), -1);
      assert.notEqual(rendered_page.indexOf("demo"), -1);
      done();
    });
  });
  it("should send out the initial socket payloads", function(done) {
    test_helper.test_socket("demo", function(socket, setup_socket) {
      setup_socket(function() {
        socket.on("query_results", function(res) {
          assert.notEqual(res, null);
          done();
        });
        socket.emit("query");
      });
    });
  });
});
