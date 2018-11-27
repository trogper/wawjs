const fs = require('fs');
const async = require('async');
const path = require('path');
module.exports = findInFiles;

function findInFiles(dirs, fileName, needle, cb) {
  async.concat(dirs, (dir, cb) => {
    fs.readdir(dir, (err, files) => {
      files = files.filter(f => f == fileName);
      cb(err, files.map(f => path.join(dir, f)));
    });
  },
  (err, res) => {
    async.filter(res, (file, cb) => {
      fs.readFile(file, (err, data) => {
        cb(err, data && data.indexOf(needle) >= 0);
      });
    },
    cb);
  });
}

let dirs = ["fi/b", "fi/a"].map(d=>__dirname+"/../test/data/"+d);
findInFiles(dirs, "1.txt", "/1", (err, file) => {
  console.log("file is", file);
  console.log("err is", err);
})
