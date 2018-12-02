async function a() {
  return 10;
}

a()
  .then((r) => console.log(r));

(async function() {

  let r = await a();
  console.log(r);

})()