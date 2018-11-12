const assert = require("assert");
// unroll BDD for various implementations
// one of the simple ways to do it
const impls = [
  require("../src/array.js"),
  require("../src/array2.js"),
  // require("../src/array3.js")
];

impls.forEach(
  (impl, i) => describe(`testing impl #${i+1}`, () => tests(impl))
);

function tests(array) {
  it("array supports sort and reverse function", () => {
    let arr1 = [1,2,3];
    let arr2 = [3,2,1];
    let arr3 = [3,1,2];
    let arr_rev = array.reverse(arr2);
    let arr_sort = array.sort(arr3);

    assert.deepEqual(arr_rev, arr1, "Reversed arrays are equal");
    assert.deepEqual(arr_sort, arr1, "Sorted arrays are equal");
  });

  it("sort algorithm is identical with Array.prototype.sort", () => {
    let inputs = [
      [2, 1],
      ["b", "a", "c"],
    ];
    inputs.forEach(arr => {
      let arr2 = [...arr];
      arr2.sort();

      let arr_sort = array.sort(arr);

      assert.deepStrictEqual(arr_sort, arr2, "Sorted arrays are equal");
    });
  });

  it("sort returns new [], not the same array", () => {
    // just demo of existing method
    var unsorted = [2, 1];
    var sorted = unsorted.sort();
    assert(sorted === unsorted,
      "original Array.prototype.sort is mutating, returns same reference"
    );

    var sorted2 = array.sort(unsorted);
    assert(sorted2 !== unsorted,
      "array.sort is non-mutating, returns different reference"
    );

  });

  it("sort does not mutate original []", () => {
    var unsorted = [2, 1];
    var cloned = [...unsorted];
    var sorted = array.sort(unsorted);
    assert.deepEqual(unsorted, cloned, "Sort is non-mutating");
  });

  it("sort supports compareFunction", () => {
    var unsorted = [1, 2];
    var sorted = array.sort(unsorted, (a, b) => b - a);
    assert.deepStrictEqual(sorted, [2, 1]);
  });

  it("Array.prototype.sort and sparse arrays", () => {
    var a = [0, 1];
    a[99] = 99;

    assert(a.length === 100);
    assert(0 in a);
    assert(!(50 in a));

    a.sort((a, b) => b - a)
    assert(a.length === 100);
    assert(a[0] === 99);
    assert(a[1] === 1);
    assert(a[2] === 0);
    assert(!(3 in a));
  });

  it("array.sort returns shorter array, only with items defined in array", () => {
    var a = [0, 1];
    a[99] = 99;


    var a1 = array.sort(a, (a, b) => b - a)
    assert.equal(a1.length, 3);

    assert(a1[0] === 99);
    assert(a1[1] === 1);
    assert(a1[2] === 0);
  });

  it.skip("reverse", function() {
    // TODO: all in one test for all reverse features
    //
    //

  });
}
