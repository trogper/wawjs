/*
returns new object Transform stream
	- accepting objects
	- and returning strings representing JSON.stringify(obj)

use cases:

fromGenerator(sequence).pipe(stringify).pipe(process.stdout);
*/

const stream = require('stream');

class StringifyTransform extends stream.Transform {
  _transform(chunk, enc, cb) {
    let data = JSON.stringify(chunk);
    this.push(data);
    cb();
  }
  constructor(options = {}) {
    options.objectMode = true;
    super(options);
  }
}

module.exports=function(){
  return new StringifyTransform();
}
