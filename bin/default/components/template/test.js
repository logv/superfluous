var assert = require("assert");

describe('TEMPLATE', function(){
  describe('#initialize()', function(){
    it('should initialize the component', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
  describe('#client()', function(){
    it('should initialize the component on the client', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});
