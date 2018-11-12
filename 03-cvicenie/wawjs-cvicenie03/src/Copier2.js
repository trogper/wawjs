// just sample implementation
// for practice of coding styles
// not a real 'best' copyFile implementation
// FIXME: najdite bug, napiste test, spravte fix

const fs = require("fs");
const EventEmiter = require("events");

class Copier2 extends EventEmiter {

  constructor(from, to) {
    super();
    this._from = from;
    this._to = to;
  }
  copy() {

    let wasErr;

    const stream = fs.createReadStream(this._from);

    let fileIsOpen = false;

    stream.on("data", (chunk) => {
      try {
        if (fileIsOpen)
          fs.appendFileSync(this._to, chunk);
        else
          fs.writeFileSync(this._to, chunk);
        fileIsOpen = true;
      } catch (err) {
        wasErr = true;
        this.emit("error", err);
      }
    });
    stream.on("close", () => {
      !wasErr && this.emit("finish", {
        from: this._from,
        to: this._to
      });
    });
    stream.on("error", (err) => {
      this.emit("error", err);
    });
  }
}

module.exports=Copier2;
