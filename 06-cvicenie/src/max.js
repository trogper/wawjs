// initial motivation:
// implement max() similar to Math.max()
// but be sure that the method does not fail
// (does not return NaN if some parameter is not convertible to number)
// demonstartion of:
// - transforming functions (changing parameters)
// - composition (and())

// common helpers usable aslo elsewhere
const and = require("./and.js")

const filterArgs = require("./filterArgs.js");
// helper
const isNumber = (any) => typeof any === "number" && any === any;


// max implementations
// this would be manual code, not bad
// however let's try other approach
// const maxNumber = (...args) => Math.max(...args.filter(isNumber));

// implementation using transforming function
const maxNumber = filterArgs(Math.max, isNumber);

// const best = (better, items) =>
//   items.reduce((best, curr) => better(curr, best) ? curr : best);

const minNumber = filterArgs(Math.min, isNumber);//(...arr) => best((a,b)=>a<b, arr.filter(isNumber));
const minInteger = filterArgs(Math.min, Number.isInteger);
const minFinite = filterArgs(Math.min, Number.isFinite);
const isNegative = (n) => n<0;
const maxNegativeInteger = filterArgs(Math.max, isNumber, isNegative);

// you can use it for outher APIs not only Max
//const concat = filterArgs(String.prototype.concat.bind(''), (x) => typeof x === "string")



module.exports = {
  isNumber,
  maxNumber,
  minNumber,
  minInteger,
  minFinite,
  maxNegativeInteger
}

//-------------------------- tests ----------------------------------------
process.env.SELF_TEST && (() => {
  console.error(`[self test]:${__filename}:...`)


  var assert = console.assert.bind(console);

  let nan = Math.max(1, 2, 3, "elefant");
  assert(Number.isNaN(nan),
    "NaN is returned, If any argument cannot be converted to a number, .");

  assert(maxNumber(1, 2, 3, "elefant") === 3);
  assert(minNumber(-1, 2, 3, "elefant") === -1);


  assert(minInteger(-Infinity, 1.33, 2, 3, "elefant") === 2);

  
  assert(minNumber(-Infinity, 2, 3, "elefant") === -Infinity);
  assert(minFinite(-Infinity, 2, 3, "elefant") === 2);

  assert(Object.is(Math.max(1, 2, NaN, 3), NaN));
  assert(Object.is(Math.min(1, 2, NaN, 3), NaN));

  assert(Object.is(maxNumber(1, 2, NaN, 3), 3));
  assert(Object.is(minNumber(1, 2, NaN, 3), 1));

  assert(maxNegativeInteger(-2, -1, -1.1, 0, 1.1, 1) == -1);

  //assert(concat('a', 'b', 'c', 3, true) === 'abc');

  console.error(`[self test]:${__filename}:OK`)



})();
