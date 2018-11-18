const bufLength = require("../src/bufLength");

const assert = require("assert");

describe("BufferLength", function() {
	it.skip("correctly sums lengths of 4 buffers", function(done) {
    let b0 = new Buffer([]);
    let b1 = new Buffer([1]);
    let b2 = new Buffer([1,1]);
    let b3 = new Buffer([1,1,1]);
    let b4 = new Buffer([1,1,1,1]);
    let b5 = new Buffer([1,1,1,1,1]);

    let arr = [b0,b1,b2,b3,b4,b5];

    assert.equal(bufLength(arr), 15, "Incorrect sum");

		done();
	});
});
