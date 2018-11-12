const fromGenerator = require('../src/fromGenerator');
const stringify = require('../src/stringify');
const assert = require("assert");

describe("stringify", function() {
	it("stringify works for objects, numbers, strings and arrays", function(done) {
    function* generator() {
      yield {a: 12, b:"Asd"};
      yield 42;
      yield [12, {c:3}, "hello"];
      yield "test";
    }

    let sequence = generator();

    let expArray = [{a: 12, b:"Asd"}, 42, [12, {c:3}, "hello"], "test"];
    let actArray = [];

    fromGenerator(sequence)
			.pipe(stringify())
			.on("data", function(data) {
      	actArray.push(JSON.parse(data));
	    }).on("end", () => {
	      assert.deepEqual(actArray, expArray, "stringify arrays are not equal");
	      done();
	    });
  });
});
