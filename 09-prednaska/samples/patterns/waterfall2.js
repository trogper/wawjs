const { waterfall } = require("async");
const { getPageHtml, parseMethods } = require("./lib/index.js");
// Runs the tasks array of functions in series, 
// each passing their results to the next in the array. 
// If any of the tasks pass an error to their own callback, 
//    the next function is not executed, 
//    and the main callback is immediately called with the error.

waterfall([
    (cb) => /*...*/ cb(null, 1),

    (d, cb) => /*...*/ cb(null, d + 2),

    (d, cb) => /*...*/ cb(null, d + 3),
  ],
  (err, data) => {
    if (err) {
      console.error(err, data);
    } else {
      console.log(data);
    }
  }
);



waterfall([
  (cb) => getPageHtml("Array", cb),
  (html, cb) => parseMethods(html, cb),
  (html, cb) => parseMethods(html, cb)
], (err, data) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(data);
  }
})

const done = (err, data) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(data);
  }
};

//getPageHtml("Array", (err, html) => parseMethods(html, done))