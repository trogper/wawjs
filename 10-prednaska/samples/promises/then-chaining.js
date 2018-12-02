const fs = require("fs").promises;
const path = require("path");

ls(".") // async -> Promise
  .then(dirsOnly) // sync named
  .then(dirs => dirs[0].name) // sync arrow
  .then(ls) // async -> Promise
  .then(filesOnly) // sync
  .then((files) => // sync map
    files.map(({ name }) => name)
  )
  .then(print) // sync undefined

function ls(d) {
  return Promise.resolve()
    // enclose sync code in handler
    .then(() => {
      let dir = path.join(__dirname, "..", d);
      return fs.readdir(dir, { // async 
        withFileTypes: true
      })
    });
}

function dirsOnly(files) {
  return files.filter((f) => f.isDirectory());
}

function filesOnly(files) {
  return files.filter((f) => f.isFile());
}

function print(data) {
  console.log(data);
}