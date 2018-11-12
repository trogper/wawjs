// module API
module.exports = {
  countDefined,
  filterDefined,
  sort,
  reverse,
  // TODO: add others (all applicable from array)
};

function countDefined(a) {
  return a.filter(() => true).length;
}

function filterDefined(a) {
  return a.filter(()=>true);
}

function sort(a, compareFunction) {
  // return filterDefined(a).sort(compareFunction);
  var b = filterDefined(a).sort(compareFunction);
  a[Symbol()] = 100;
  return b;
}

function reverse(a) {
  return filterDefined(a).reverse();
}
