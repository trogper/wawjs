const { waterfall } = require("async");

// Runs the tasks array of functions in series, 
// each passing their results to the next in the array. 
// If any of the tasks pass an error to their own callback, 
//    the next function is not executed, 
//    and the main callback is immediately called with the error.

waterfall([
    (cb) => cb(null, "a1", "a2"),

    (p1, p2, cb) => cb(null, p1 + p2 + "b"),

    (p, cb) => cb(null, p + "c"),
  ],
  (err, result) => {
    if (err) {
      console.error(err, result);
    } else {
      console.log(result);
    }
  }
);




