module.exports = function(o) {
  return { ...o,
    c: o.a + o.b
  };
}