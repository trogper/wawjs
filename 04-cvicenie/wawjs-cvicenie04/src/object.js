module.exports = {
  allOwnKeys,
  allOwnValues,
  allOwnEntries,
  getProtoChain,
  allKeys,
  forIn,
  shallowClone,
  hasInheritedProperty,
  hasOverridenProperty
};

// Object.keys supporting Symbols and non-enumerables
function allOwnKeys(o) {
  // LOC:3
  let properties = Object.getOwnPropertyNames(o);
  let symbols = Object.getOwnPropertySymbols(o);
  return properties.concat(symbols);
}

// Object.values supporting Symbols and non-enumerables
function allOwnValues(o) {
  // LOC: 1
  return allOwnKeys(o).map(k => o[k]);
}

// Object.entries supporting Symbols and non-enumerables
function allOwnEntries(o) {
   // LOC: 1
   return allOwnKeys(o).map(k => [k, o[k]]);
}

// [obj,...protos] array of objects in proto chain
// starting with obj itself and up-the chain
function getProtoChain(obj) {
  //LOC: 7
  let protos = [];
  let proto = obj;
  while (proto) {
    protos.push(proto);
    proto = Object.getPrototypeOf(proto);
  }
  return protos;
}

// Object.keys including, inherited, not-enumeble, symbols
function allKeys(obj) {
  //LOC: 10
  let keys = [];
  let protos = getProtoChain(obj);
  for (let proto of protos) {
    keys = allOwnKeys(proto).concat(keys); //.forEach(k => keys.push(k));
  }
  return keys;
}

// for..in loop supporting Symbols and non-enumerable
// for own and inherited properties
function forIn(obj, callback) {
  //LOC: 1
  allKeys(obj).forEach(callback);
}

// create copy of object
// with same propereties,
// including symbols,
// same values
// and same property ownership
function shallowClone(obj) {
  // LOC: 4
  let o = Object.create(obj);
  Object.assign(obj, o);
  //Object.setPrototypeOf(o, Object.getPrototypeOf(obj));
  return o;
}

// if the property exists only in proto chain
// not on object
function hasInheritedProperty(obj, prop) {
  //LOC:2
  return (prop in obj) && ! Object.prototype.hasOwnProperty.call(obj, prop);
}

function hasOverridenProperty(obj, prop) {
  //LOC:5
  return (prop in Object.getPrototypeOf(obj)) && Object.prototype.hasOwnProperty.call(obj, prop);
}
