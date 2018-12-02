// let's have async functions
const a = () => new Promise(res => { setTimeout(res, 3000, "a") });
const b = (d) => new Promise(res => { setTimeout(res, 2000, d + "b") });
const c = (d) => new Promise(res => { setTimeout(res, 8000, d + "c") });

// waterfall must be implemented
const waterfall = (promises) =>
  // TODO: review
  promises.reduce((p, f) => p.then(f), Promise.resolve());

waterfall([
    a,
    b,
    c
  ])
  .then((data) => {
    // b  
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

