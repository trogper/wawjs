var cov_2d9ixqu4rm = function() {
  var path = "./src/m.js",
    hash = "7013894b28f74e408eafd19dcc27e07fdf6aaf65",
    Function = function() {}.constructor,
    global = new Function('return this')(),
    gcv = "__coverage__",
    coverageData = {
      path: "./src/m.js",
      statementMap: {
        "0": { start: { line: 1, column: 0 }, end: { line: 5, column: 1 } },
        "1": { start: { line: 3, column: 4 }, end: { line: 3, column: 18 } }
      },
      fnMap: { 
      	"0": { name: "(anonymous_0)", decl: { start: { line: 2, column: 5 }, end: { line: 2, column: 6 } }, loc: { start: { line: 2, column: 17 }, end: { line: 4, column: 3 } }, line: 2 } },
      branchMap: { "0": { loc: { start: { line: 3, column: 11 }, end: { line: 3, column: 17 } }, type: "binary-expr", locations: [{ start: { line: 3, column: 11 }, end: { line: 3, column: 12 } }, { start: { line: 3, column: 16 }, end: { line: 3, column: 17 } }], line: 3 } },
      s: { "0": 0, "1": 0 },
      f: { "0": 0 },
      b: { "0": [0, 0] },
      _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184"
    },
    coverage = global[gcv] || (global[gcv] = {});
  if (coverage[path] && coverage[path].hash === hash) { return coverage[path]; } coverageData.hash = hash;
  return coverage[path] = coverageData;
}();
cov_2d9ixqu4rm.s[0]++;
module.exports = {
  b: function(x) {
    cov_2d9ixqu4rm.f[0]++;
    cov_2d9ixqu4rm.s[1]++;
    return (cov_2d9ixqu4rm.b[0][0]++, x) || (cov_2d9ixqu4rm.b[0][1]++, 0);
  }
};