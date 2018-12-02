/*global describe:true,it:true */
// https://nodejs.org/api/querystring.html
/**
 * @jest-environment node1
 */
const querystring = require("querystring");
const assert = require("assert");

//console.error(querystring.parse);
test("instanceof", function() {
    assert([] instanceof Array);
});

test("same keys parsed to array (instanceof)", function() {
    let parsed = querystring.parse("foo=bar&abc=xyz&abc=123");
    assert(parsed.abc instanceof Array);
});
test("same keys parsed to array (isArray)", function() {
    let parsed = querystring.parse("foo=bar&abc=xyz&abc=123");
    assert(Array.isArray(parsed.abc));
});
test("same keys parsed to array (toString)", function() {
    let parsed = querystring.parse("foo=bar&abc=xyz&abc=123");
    const toString = Object.prototype.toString;
    assert.equal(toString.call(parsed.abc), '[object Array]');
});