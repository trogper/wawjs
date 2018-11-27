 const async = require("async");
 const fs = require("fs");
 module.exports = saveSomewhere;

 function saveSomewhere(paths, data, callback) {
   async.detectSeries(paths, (path, cb) => {
     fs.writeFile(path, data, (err) => {
       cb(null, !err);
     });
   }, (err, res) => {
     if (!err && !res)
      err = err new Error("No file saved");
     callback(err, res);
   });
 }
