// implement test for expected behavior of generator streams
const fromGenerator = require('../src/fromGenerator');
const assert = require("assert");

describe("fromGenerator", function() {
	it("fromGenerator sequence test", function(done) {
		function* generator(limit) {
			for (let i = 1; i <= limit; i++) yield i;
		}

		let sequence = generator(12);

		let expArray = [1,2,3,4,5,6,7,8,9,10,11,12];
		let actArray = [];

		fromGenerator(sequence).on("data", function(data){
			actArray.push(data);
		}).on("end", () => {
			assert.deepEqual(actArray, expArray, "fromGenerator arrays are not equal");
			done();
		});
	});

	it("fromGenerator preserves -0, undefined and string", function(done) {
		function* generator(limit) {
			for (let i = 1; i <= limit; i++)
				yield (i == 2) ? -0 : (i == 5) ? undefined : (i == 8) ? "8" : i;
		}

		let sequence = generator(10);

		let expArray = [1,-0,3,4,undefined,6,7,"8",9,10];
		let actArray = [];

		fromGenerator(sequence).on("data", function(data){
			actArray.push(data);
		}).on("end", () => {
			assert.deepEqual(actArray, expArray, "fromGenerator arrays are not equal");
			done();
		});
	});

});
