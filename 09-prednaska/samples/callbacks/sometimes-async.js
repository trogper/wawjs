function sometimesAsync(arg, callback) {
  if (cache[arg]) {
      return callback(null, cache[arg]); // this would be synchronous!!
  } else {
      doSomeIO(arg, callback); // this IO would be asynchronous
  }
}

	