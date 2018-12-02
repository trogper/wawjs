const fs = require("fs").promises;

fs.readdir('foo')
  .then(
    (files) => console.log("resolved:", files),
    (err) => console.error("rejected:", err)
  )

// rejected: Error: ENOENT: no such file or directory

// When a value is simply returned from within 
// a then handler, 
// it will effectively return 

//   Promise.resolve(<
//		value returned 
//   	by whichever handler was called
//   >).

// A then call will return a rejected promise 
// if the function throws an error or returns 
// a rejected Promise.

