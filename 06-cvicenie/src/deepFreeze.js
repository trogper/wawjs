'use strict'
const traverse = require("traverse");

module.exports = function(o) {
  traverse(o).forEach( function(k,v,o) {Object.freeze(v)} );
  // traverse(o).forEach(function () {
  //   this.post((n) => Object.freeze(this.node));
  // });

}
//-------------------------- tests ----------------------------------------
process.env.SELF_TEST && ((deepFreeze) => {
  console.error(`[self test]:${__filename}:...`)


  var assert = require("assert");

  let o = { a: 1, b: 2, c: { d: 3, e: 4 }, f: [1, 2, 3] }

  deepFreeze(o);
  
  assert.throws(() => o.g = 999,
    "Cannot define new property"
  );
  assert.throws(() => o.c.d = 999,
    "Cannot assign to read only property"
  );
  assert.throws(() => o.f.pop(),
    "Cannot delete property"
  );

  console.error(`[self test]:${__filename}:OK`)
})(module.exports);
