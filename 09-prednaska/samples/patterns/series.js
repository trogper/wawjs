const { series, asyncify } = require("async");

// Run the functions in the tasks collection in series, 
// each one running once the previous function has completed. 
// If any functions in the series pass an error to its callback, 
//    no more functions are run, 
//    and callback is immediately called with the value of the error. 
// Otherwise, callback receives 
//    an array of results when tasks have completed.

series([
    (cb) => cb(null, 1),
    (cb) => cb(null, 2),
    (cb) => cb(null, 3),
  ],

  (err, data) => {
    if (err) {
      // err,[1,...]
      console.error(err, data);
    } else {
      console.log(data); //[1,2,3]
    }
  }
);




const a = (cb) => cb(null, 1);
const b = async () => 2;
const c = () => Promise.resolve(3);
const c1 = asyncify(c);

series([
  a,
  b,
  c1
], (err, data) => {
  if (err) {
    console.error("Error:", err, data);
  } else {
    console.log(data);
  }
});


https://www.nay.sk/vyhladavanie?q=QE55Q6FN


