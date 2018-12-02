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
  fs.mkdtemp(tempDir, (err, folder) => {
    if (err) return cb(err);
    let filePath = `${folder}/${fileName}`;
    // console.log(filePath);
    try {
      fs.writeFile(filePath, data, options, (err) => {
        if (err) return cb(err);
        cb(null, filePath);
      });
    } catch (e) {
      cb(e);
    } finally { }
  })
}
// console.log(writeTempFile.length);
