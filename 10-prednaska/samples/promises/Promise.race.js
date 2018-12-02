// let's have async functions
const a = () => new Promise(res => { setTimeout(res, 3000, "a") });
const b = () => new Promise(res => { setTimeout(res, 2000, "b") });
const c = () => new Promise(res => { setTimeout(res, 8000, "c") });

// race pattern
Promise.race([
    a(),
    b(),
    c()
  ])
  .then((data) => {
    // b  
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

