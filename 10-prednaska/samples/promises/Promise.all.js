// let's have async functions
const a = () => new Promise(res => { setTimeout(res, 3000, "a") });
const b = () => new Promise(res => { setTimeout(res, 2000, "b") });
const c = () => new Promise(res => { setTimeout(res, 8000, "c") });

// parallel pattern
Promise.all([
    a(),
    b(),
    c()
  ])
  .then((data) => {
    // [ 'a', 'b', 'c' ]
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

