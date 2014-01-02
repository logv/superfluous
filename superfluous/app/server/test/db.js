"use strict"

var test_helper = require("superfluous").test_helper;
test_helper.init();

var assert = require("assert");
describe("core/server/db.js", function() {
  var db = require_app("server/db");
  describe("#install", function() {
    test_helper.it("should have a test", function(done) {
      db.install();
      done();
    });
  });
});
