const fs = require("fs").promises;

fs.readdir(`${__dirname}`)
  .then((files) => console.log(files))

fs.readdir(`${__dirname}/..`,)
  .then((files) => {
  	return //...
  }) // -> the promise returned by then
  
// a) returns a value, 
// gets resolved with the returned value as its value;

// b) doesn't return anything, 
// gets resolved with an undefined value

// c) throws an error, 
// gets rejected with the thrown error as its value;

// d) returns an already resolved promise, 
// gets resolved with that promise's value as its value;

// e) returns an already rejected promise, 
// gets rejected with that promise's value as its value;

// f) returns another pending promise object, 
// the resolution/rejection of the promise returned by then 
// will be subsequent to the resolution/rejection 
// of the promise returned by the handler. 
// Also, the value of the promise returned by then 
// will be the same as the value 
// of the promise returned by the handler.


