const http = require("http");
const fs = require("fs");
const stream = require("stream");

let path = process.argv[2];

if (!path)
  throw new Error("No file specified"); // TODO if no file, use stdin & stdout

if (!fs.existsSync(path))
  throw new Error("File specified does not exist");

if (fs.existsSync(path+".gz"))
  ;//throw new Error("File already GZipped");

let fileIn = fs.createReadStream(path);
let fileOut = fs.createWriteStream(path+".gz");

let req = http.request("http://localhost:8080", {method: "POST"});

function done() {
  console.log("done");
}

fileIn.pipe(req);

req.on("response", (res) => {
  stream.pipeline(
    res,
    fileOut,
    done
  );
});
