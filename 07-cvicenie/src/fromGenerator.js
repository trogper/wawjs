/*

implement function returning Readable Stream
of objects from supplied generator

Sample: usage
function* generator(limit) {
	for (let i = 1; i <= limit; i++) yield i;
}
let sequence = generator(10000);

fromGenerator(sequence).on("data", function(data){
	console.log()
});

fromGenerator(sequence).pipe(stringify).pipe(process.stdout);
*/
const stream = require('stream');

class GeneratorStream extends stream.Readable {
  _read(size) {
    var b, res;
    do {
      res = this.generator.next();
      b = this.push(res.done ? null : res.value);
    } while (b && !res.done);
  }

  constructor(options) {
    super(options);
    this.generator = options.generator;
  }
}

module.exports = function(generator) {
  return new GeneratorStream({
    generator: generator,
    objectMode: true
  });

}
