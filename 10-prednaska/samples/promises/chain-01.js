/*
a() 						// -> Promise

.then((d)=>{ },(e)=>{ })    // -> Promise	

.then((d)=>{ },(e)=>{ })	// -> Promise

.then((d)=>{ },(e)=>{ })	// -> Promise

.catch(  (e)=>{ })			// -> Promise

.finally(()={ })			// -> Promise
*/
const util = require("util");
const pd = (promise) => process.binding('util').getPromiseDetails(promise);
const dbg = (p, name) => p.finally(() => console.log(name, ":", pd(p)));

let p1 = a();
dbg(p1, "p1");

let p2 = p1.then((d) => {}, (e) => {})
dbg(p2, "p2");

let p3 = p2.then((d) => {}, (e) => {})
dbg(p3, "p3");

let p4 = p3.then((d) => {}, (e) => {})
dbg(p4, "p4");

let p5 = p4.catch((e) => {})
dbg(p5, "p5");

let p6 = p5.finally(() => {});
dbg(p6, "p6");


function a() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 2000);
  });
}

console.log([p1, p2, p3, p4, p5]);