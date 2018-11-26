const fs = require("fs").promises;
const os = require("os");
const path = require("path");

async function writeTempFile(fileName, ...args) {

  let tempDir = path.join(os.tmpdir(),
    `${process.pid}-`);
  let folder = await fs.mkdtemp(tempDir);
  let tempFile = path.join(folder, fileName);
  await fs.writeFile(tempFile, ...args)
  return tempFile;

}


(async () => {

  
  let path = await writeTempFile("test.txt", "test");
  console.log(path);

  try {
    let path2 = await writeTempFile("test.txt", "test", "FOO");
    console.log(path2)
  } catch (err) {
    console.error("err:", err);
  }

})();