let promise = a()

  .then((d) => { }, (e) => { })

  .catch((err) => { })

  .finally(() => { });

promise.then(
  (v) => console.log("v", v),
  (e) => console.error("e", e)
);

function a() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 200);
  });
}