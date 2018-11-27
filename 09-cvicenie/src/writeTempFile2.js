module.exports = writeTempFile;

const fs = require("fs");
const os = require("os");
const path = require("path");
const async = require("async");

function writeTempFile(fileName, data, options, callback) {
  callback = callback || options;
  options = callback === options ? {} : options;

   async.waterfall([
     (cb) => {
       let tempDir = path.join(os.tmpdir(), `${process.pid}-`);
       cb(null, tempDir);
     },
     (tempDir, cb) => {
       fs.mkdtemp(tempDir, (err, folder) => {
         if (err) return cb(err);
         let filePath = `${folder}/${fileName}`;
         cb(null, filePath);
       });
     },
     (filePath, cb) => {
       try {
         fs.writeFile(filePath, data, options, (err) => {
           if (err) return cb(err);
           cb(null, filePath);
         });
       } catch (e) {
         cb(e);
       } finally { }
     }

   ], callback);
}
