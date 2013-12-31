"use strict";

var globals = require("../globals");
globals.install();

var context = require("../context");
var router = require("../router");
var assert = require("assert");

var app = require("connect")();
app.locals = {};

describe('router', function(){
  describe('#install()', function(){
    router.install(app);
    it('should install add the router onto the app', function(){
      assert.notEqual(app.router, null);
    });

    it('should install route handlers into the app', function(){
      assert.notEqual(app.get, null);
      assert.notEqual(app.post, null);
      assert.equal(app.qed, null);
    });
  });
});
