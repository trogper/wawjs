const glob = require("glob-promise");
const assert = require("assert");
const alg = require("../alg.js");

describe("Snapshot test", function() {

  const unroll = () =>
    glob("./data/*.in.*", { cwd: __dirname });
  const addTest = (inputFile) => this.addTest(_it(
    inputFile,
    inputFile.replace(/[.]in[.](js|json)$/, ".out.json")
  ))
  before("unroll", () => unroll().then(files =>
    files.forEach(addTest)));
  it("unroll", () => {});

  function _it(inputFile, outputFile) {
    return it(`snapshot: ${inputFile},${outputFile}`, () => {
      const i = require(inputFile);
      const o = require(outputFile);

      const actual = alg(i);

      try {
        assert.deepEqual(actual, o);
        return save(outputFile, actual);
      } catch (ex) {
        return save(outputFile, actual).then(
          () => Promise.reject(ex)
        );
      }
    });
  }
});
const fs = require("fs-extra");
const path = require("path");

function save(outPath, data) {
  typeof data == "string" || (data = JSON.stringify(data, null, 2));
  outPath = path.resolve(__dirname, outPath);
  return fs.ensureDir(path.dirname(outPath))
    .then(() => fs.writeFile(outPath, data));
}