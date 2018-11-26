// prints ../*/*.* 
// means all files in parent folder folders

const fs = require("fs").promises;

(async () => {

  let dirs = await ls(".");
  dirs = dirsOnly(dirs)
    .map(({ name }) => name);
  let files = await Promise.all(dirs.map(ls));
  files = [].concat(...files);
  files = filesOnly(files);
  files = files
    .map(({ name }) => name);
  print(files);

})();

async function ls(d) {
  return fs.readdir(`${__dirname}/../${d}`, {
    withFileTypes: true
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