 const async = require("async");
 const fs = require("fs");
 module.exports = saveSomewhere;

 function saveSomewhere(paths, data, cb) {
   const tasks = paths.map(p => {
     return (cb) => {
       fs.writeFile(p, data, (err) => {
         cb(err, p);
       });
     };
   });

   async.tryEach(tasks, cb);
 }
