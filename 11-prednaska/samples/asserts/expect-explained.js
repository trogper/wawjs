const { expect } = require("chai");
var beverages = { tea: "Lipton" };

expect(beverages).to.have.property('tea').with.lengthOf(6);

expect(beverages)        .property('tea')     .lengthOf(6);

// to,be,been,is,that,which,and,has,have,with,at,of,same,but,does,still

expect(beverages).of.is.but.has.property('tea').of.still.lengthOf(6);

var beverages = Object.create({ tea: "Lipton" });

expect(beverages).    to.have    .property('tea');


expect(beverages).not.to.have.own.property('tea');

expect(beverages).not        .own.property('tea');




