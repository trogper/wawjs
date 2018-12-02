// run the examples, and watch for 
// 		reported errors 'quality'
//  	and differences in semantics
//
// the test is not exact in any variant
// just demonstrates differences 

suite("Style comparison", function() {

  let beverages = { tea: "Lipton" };
  //let beverages = { tea: "Liption" };
  //let beverages = {};
  //let beverages = {tea:null};
  //let beverages = {tea:[0,2,3,4,5,6]};
  //let beverages = { tea: new Set([0, 2, 3, 4, 5, 6])};
  //let beverages = Object.create({ tea: "Lipton" });
  //let beverages = Object.defineProperty({}, "tea", { value: 'Lipton' });

  test("chai expect", () => {
    let { expect } = require("chai");
    
    expect(beverages).to.have.property('tea').with.lengthOf(6);

  });
  test("chai assert", () => {
    let { assert } = require("chai");

    assert.property(beverages, 'tea');
    assert.lengthOf(beverages.tea, 6);

  });
  test("node assert", () => {
    let assert = require("assert");

    assert(beverages.hasOwnProperty("tea"));
    assert.equal(beverages.tea.length, 6);

  });
  test("better-assert", () => {
    let assert = require("better-assert");

    assert(beverages.hasOwnProperty("tea"));
    assert(beverages.tea.length === 6);

  });
});