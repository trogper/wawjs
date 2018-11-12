const http = require("http");
const fs = require("fs");
const stream = require("stream");
const crypto = require("crypto");
const { createGzip } = require("zlib");

let tmpDir = `${__dirname}/tmp`;
fs.existsSync(tmpDir) || fs.mkdirSync(tmpDir);

const quiet = process.argv[2] == "-q";

http.createServer(function (req, res) {
  let rand = crypto.randomBytes(4).readUInt32LE(0);
  let tmpFile = `${tmpDir}/${rand}`;

  let fileOut = fs.createWriteStream(tmpFile);

  quiet || console.log("client connected");

  stream.pipeline(
    req,
    createGzip(),
    res,
    (err) => {quiet || console.log(err ? err : "response done");}
  );

  stream.pipeline(
    req,
    fileOut,
    (err) => {quiet || console.log(err ? err : "file done");}
  );

}).listen(8080);
