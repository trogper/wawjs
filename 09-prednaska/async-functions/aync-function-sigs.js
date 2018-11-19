// signatures

function a(params,callback) {
  //...
  callback(null, data);
  callback(err, data);
}

function b(params) {
  //...
  return Promise.resolve(data);
  return Promise.reject(err);
}

function* c(params) {
  //...
  return data; //impl. promise
  throw err;
}

// how and where continuation is written
// and executed

do1(args,(err, cb) => {
  if (err) {
    //...
  } else {
    //...
  }
});

do2(args).then((data) => {
  //...
}, (err) => {
  //...
});

try {
  let data = await do3(args);
} catch (err) {
  //...	
}