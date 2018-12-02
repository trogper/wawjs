const assert = require("assert");

/*global describe:true,it:true,	after:true,before:true,afterEach:true,beforeEach:true */
describe("test display of assertion errors", function() {


    it("assert(x == 20)", () => {
        let x = 10;
        assert(x == 20);
    });
    it("assert.equal(x, 20)", () => {
        let x = 10;
        assert.equal(x, 20);
    });
});