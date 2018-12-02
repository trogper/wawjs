const Benchmark = require("benchmark");
const suite = new Benchmark.Suite;
const assert = require("assert");

// add tests
const a = (+new Date + '').split('');
const r = a.sort().reverse();

suite.add('__noop', function() {})

suite.add('sort(a-b).reverse()', function() {
  let x = a.sort((a, b) => a - b).reverse();
  //assert.deepEqual(x, r);
})
suite.add('sort(b-a)', function() {
  let x = a.sort((a, b) => b - a);
  //assert.deepEqual(x, r);
})
suite.add('sort(i * a - i * b).reverse()', function() {
  let i = -1;
  let x = a.sort((a, b) => i * a - i * b);
  //assert.deepEqual(x, r);
})

// add listeners
suite.on('cycle', function(event) {
  console.log(String(event.target));
})
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
suite.run({ 'async': true });
