module.exports = writeTempFile;

const fs = require("fs");
const os = require("os");
const path = require("path");


function writeTempFile(fileName, data, options, cb) {
  if (!cb) {
    cb = options;
    options = {};
  }
  let tempDir = path.join(os.tmpdir(), `${process.pid}-`);
  fs.mkdtemp(tempDir, (err) => {
    if (err) return cb(err);
    fs.writeFile(tempDir)
  })
}
// console.log(writeTempFile.length);
