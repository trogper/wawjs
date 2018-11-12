const stream = require('stream');

class MapTransform extends stream.Transform {
  _transform(chunk, enc, cb) {
    let data = this.mapper(chunk);
    this.push(data);
    cb();
  }
  constructor(options) {
    options.objectMode = true;
    super(options);
    this.mapper = options.mapper
    if (typeof this.mapper != "function")
      throw new TypeError("mapper must be a function");
  }
}

class FilterTransform extends stream.Transform {
  _transform(chunk, enc, cb) {
    if (this.filter(chunk))
      this.push(chunk);
    cb();
  }
  constructor(options) {
    options.objectMode = true;
    super(options);
    this.filter = options.filter;
    if (typeof this.filter != "function")
      throw new TypeError("filter must be a function");
  }
}

class FilterDuplicateTransform extends stream.Transform {
  _transform(chunk, enc, cb) {
    let compared = this.deepEqual ? JSON.stringify(chunk) : chunk;

    if (!this.seen.has(compared)) {
      this.push(chunk);
      this.seen.add(compared);
    }
    cb();
  }
  constructor(options = {}) {
    options.objectMode = true;
    super(options);
    this.deepEqual = options.deepEqual;
    this.seen = new Set();
  }
}

module.exports = {
  map: function(fn) {
    return new MapTransform({mapper: fn});
  },
  filter: function(fn) {
    return new FilterTransform({filter: fn});
  },
  filterDuplicate: function(fn) {
    return new FilterDuplicateTransform();
  },
  filterDeepDuplicate: function(fn) {
    return new FilterDuplicateTransform({deepEqual: true});
  }
}
