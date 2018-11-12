const assert = require("assert");

describe("flat(o)", function() {
	it("flat", function(done) {
	let x = {px: 10};

    let y = Object.create(x);
    y.py = 20;

    let z = Object.create(y);
    z.pz = 30;

    function flat(o) {
      for (let p in o) {
        o[p] = o[p];
      }
      return o;
    }

    let real = flat(z);

    assert(real.hasOwnProperty("px"));
    assert(real.hasOwnProperty("py"));
    assert(real.hasOwnProperty("pz"));
    assert(real === z);

    done();

	});
});
