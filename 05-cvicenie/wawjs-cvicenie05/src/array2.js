// module API
module.exports = {
  countDefined,
  filterDefined
  // TODO: add others (all applicable from array)
};

function countDefined(a) {
  return a.filter(() => true).length;
}

function filterDefined(a) {
  return a.filter(()=>true);
}
functions = Object.entries(Object.getOwnPropertyDescriptors(Array.prototype))
.filter(([k, v]) => typeof v.value === "function");

for (f of functions) {
  let fun = (a) => {
    [first, ...rest] = arguments;
    return f[1].value.apply(filterDefined(a), rest);
  }
  module.exports[f[0]] = fun;
}
