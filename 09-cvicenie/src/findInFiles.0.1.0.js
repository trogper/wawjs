const fs = require('fs').promises;
const async = require('async');
module.exports = findInFiles;

async function findInFiles(dirs, fileName, needle, cb) {
  for (let dir of dirs) {
    let files = await fs.readdir(dir);

    for (let file of files) {
      if (file == fileName) {
        let curFile = `${dir}/${file}`;
        let content = await fs.readFile(curFile);
        if (content.indexOf(needle) >= 0)
          return cb(null, curFile);
      }
    }
  }
  cb(new Error("no file found"));
}

let dirs = ["fi/b", "fi/a"].map(d=>__dirname+"/../test/data/"+d);
findInFiles(dirs, "1.txt", "fi/b/1", (err, file) => {
  console.log("file is", file);
  console.log("err is", err);
})
