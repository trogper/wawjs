// tested library
const Copier = require("../src/Copier.js");
const fs = require("fs");
const assert = require("assert");

describe("1) Copying existing files - API styles test", function() {

  it("Copier supports event api", function(done) {

    let from = __filename; // use self as source
    let to = __filename + ".bak";

    var c = new Copier(from, to);
    c.on("finish", () => done());
    c.on("error", (err) => done(err));
    c.copy();

  });

  it.skip("TODO: Copier supports also callback api ", function(done) {

    // TODO: adjust Copier.copy function to accept callback
    // and make this test green
    // previous test must also be green

    let from = __filename; // use self as source
    let to = __filename + ".bak";

    var c = new Copier(from, to);

    c.copy(function(err, data) {
      done(err, data);
    });

  });

  it.skip("TODO: events shall not be fired in callback api ", function(done) {

    // DO this only after previous is implemented
    let from = __filename; // use self as source
    let to = __filename + ".bak";

    var c = new Copier(from, to);
    c.on("error", () => called = true);
    c.on("data", () => called = true);
    c.copy(function(err, data) {
      if (called) done(new Error("callbacks shall not be called"));
      else done(err, data);
    });

  });

  it("FIXME: copy called multiple times incorrectly appends",function(done){
  	//TODO: 1 bod za cerveny test dokazujuci bug
  	// 1 bod za vyriesenie a fix v Copier.js

    let from = __filename; // use self as source
    let to = __filename + ".bak";

    var c = new Copier(from, to);
    c.on("finish", () => {
      let fromContent = fs.readFileSync(from, "UTF-8");
      let toContent = fs.readFileSync(to, "UTF-8");
      if(fromContent === toContent)
        done();
      else
        done(new Error("File content is not equal"));
    });
    c.copy();

  });

});
