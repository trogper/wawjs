a(function() {
  b();

  c(function() {
    d();
  })

  e();
});
f();

// order:
// a,f,b,c,e,d

function a(cb) {
  console.log("a");
  setTimeout(cb, 0);
}

function b() { console.log("b"); }

function c(cb) {
  console.log("c");
  setTimeout(cb, 0);
}

function d() { console.log("d"); }
function e() { console.log("e"); }
function f() { console.log("f"); }