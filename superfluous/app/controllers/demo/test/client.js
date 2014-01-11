describe("A blank test", function() {
  it("should work", function(done) {
    SF.controller("demo", function(ctrl) {
      assert.notEqual(ctrl, null);

      done();
    });
  });
});
