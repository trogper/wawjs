const bom = require("../../src/bom/");
const assert = require("assert");
const fs = require("fs");

describe("bom.js tests", function() {


  const bomBuffer = Buffer.from([0xEF, 0xBB, 0xBF])

  it("BOM is removed", (done) => {
    let called = 0;
    let file = `${__dirname}/data/with-bom.txt`;
    fs.createReadStream(file, { highWaterMark: 1 })
      .pipe(bom.remove())
      .on("error", done)
      .on("data", (chunk) => {
        called += chunk.length;
      })
      .on("finish", () => {
        //assert(called===1, "all buffered before")
        assert.equal(called, "// with".length);
        done();
      });
  });

  it("BOM is not removed when not present", (done) => {
    let called = 0;
    let file = `${__dirname}/data/without-bom.txt`;
    fs.createReadStream(file, { highWaterMark: 1 })
      .pipe(bom.remove())
      .on("error", done)
      .on("data", (chunk) => {
        called += chunk.length;
      })
      .on("finish", () => {
        assert.equal(called, "// without".length);
        done();
      });
  });
});
