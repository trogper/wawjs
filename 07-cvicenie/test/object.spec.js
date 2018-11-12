const fromGenerator = require('../src/fromGenerator');
const object = require('../src/object');
const assert = require("assert");

describe("Object map and filter transform streams", function() {
	it("FilterTransform basic test", function(done) {
    function* generator() {
      yield {a: 12};
      yield {a: 35};
      yield {a: -1};
      yield {a: 0};
    }

    let sequence = generator();

    let expArray = [{a: -1}, {a: 0}];
    let actArray = [];

    fromGenerator(sequence)
      .pipe(object.filter(o=>o.a<10))
      .on("data", o => actArray.push(o))
      .on("end", () => {
        assert.deepEqual(actArray, expArray, "Arrays are not equal");
        done();
      });
	});

  it("FilterTransform should not accept non-function", function(done) {
    assert.throws(d => object.filter(42), TypeError, "FilterTransform accepts number");
    assert.throws(d => object.filter(), TypeError, "FilterTransform works without parameter");
    done();
  });

  it("MapTransform basic test", function(done) {
    function* generator() {
      yield {a: 12};
      yield {a: 35};
      yield {a: -1};
      yield {a: 0};
    }

    let sequence = generator();

    let expArray = [{a: 22}, {a: 45}, {a: 9}, {a: 10}];
    let actArray = [];

    fromGenerator(sequence)
      .pipe(object.map(o=>{return {a:o.a+10}}))
      .on("data", o => actArray.push(o))
      .on("end", () => {
        assert.deepEqual(actArray, expArray, "Arrays are not equal");
        done();
      });
  });

  it("MapTransform should not accept non-function", function(done) {
    assert.throws(d => object.map(42), TypeError, "MapTransform accepts number");
    assert.throws(d => object.map(), TypeError, "MapTransform works without parameter");
    done();
  });

  it("FilterDuplicateTransform basic test", function(done) {
    function* generator() {
      yield {a: 12};
      yield {a: 35};
      yield {a: -1};
      yield {a: 0};
      yield {a: 35};
      yield {a: -1};
    }

    let sequence = generator();

    let expArray = [{a: 12}, {a: 35}, {a: -1}, {a: 0}, {a: 35}, {a: -1}];
    let actArray = [];

    fromGenerator(sequence)
      .pipe(object.filterDuplicate())
      .on("data", o => actArray.push(o))
      .on("end", () => {
        assert.deepEqual(actArray, expArray, "Arrays are not equal");
        done();
      });
  });

  it("FilterDuplicateTransform basic test 2", function(done) {
    let o1 = {a: 12};
    let o2 = {a: 44};
    function* generator() {
      yield o1;
      yield o2;
      yield o2;
      yield o1;
    }

    let sequence = generator();

    let expArray = [o1, o2];
    let actArray = [];

    fromGenerator(sequence)
      .pipe(object.filterDuplicate())
      .on("data", o => actArray.push(o))
      .on("end", () => {
        assert.deepEqual(actArray, expArray, "Arrays are not equal");
        done();
      });
  });

  it("FilterDeepDuplicateTransform basic test", function(done) {
    function* generator() {
      yield {a: 12};
      yield {a: 35};
      yield {a: -1};
      yield {a: 0};
      yield {a: 35};
      yield {a: -1};
    }

    let sequence = generator();

    let expArray = [{a: 12}, {a: 35}, {a: -1}, {a: 0}];
    let actArray = [];

    fromGenerator(sequence)
      .pipe(object.filterDeepDuplicate())
      .on("data", o => actArray.push(o))
      .on("end", () => {
        assert.deepEqual(actArray, expArray, "Arrays are not equal");
        done();
      });
  });

});
