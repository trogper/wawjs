/*global describe:true,it:true */
// https://nodejs.org/api/querystring.html
const querystring = require("querystring");
const assert = require("assert");

describe("querystring node module test", function() {

    it("same keys parsed to array (instanceof)", function() {
        let parsed = querystring.parse("foo=bar&abc=xyz&abc=123");
        assert(parsed.abc instanceof Array);
    });
    it("same keys parsed to array (isArray)", function() {
        let parsed = querystring.parse("foo=bar&abc=xyz&abc=123");
        assert(Array.isArray(parsed.abc));
    });
    it("same keys parsed to array (toString)", function() {
        let parsed = querystring.parse("foo=bar&abc=xyz&abc=123");
        const toString = Object.prototype.toString;
        assert.equal(toString.call(parsed.abc), '[object Array]');
    });

});