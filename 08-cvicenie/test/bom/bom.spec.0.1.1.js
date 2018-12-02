const bom = require("../../src/bom/");
const assert = require("assert");
const fs = require("fs");

describe("bom.js tests", function() {


  const bomBuffer = Buffer.from([0xEF, 0xBB, 0xBF])

  it("multiple BOM is removed", (done) => {
    let called = 0;
    let file = `${__dirname}/data/with-multi-bom.txt`;
    fs.createReadStream(file, { highWaterMark: 1 })
      .pipe(bom.remove())
      .on("error", done)
      .on("data", (chunk) => {
        called += chunk.length;
      })
      .on("finish", () => {
        assert.equal(called, "// with multi bom".length)
        done();
      });
  });
});
