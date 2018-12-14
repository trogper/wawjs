const glob = require("glob-promise");
const assert = require("assert");

describe("Math.round DDT", function() {

  const unroll = () =>
    glob("./data/*", { cwd: __dirname });
  const addTest = (file) =>
    this.addTest(_it(file))
  before("unroll", () => unroll().then(
    files => files.forEach(addTest)
  ));
  it("unroll", () => assert(this.total() > 1));


  function _it(test) {
    return it(`testing: ${test}`, function() {
      let { input, output } = require(test);
      let actual = Math.round(input);
      assert.equal(actual, output);
    });
  }
});


