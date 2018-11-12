// just sample implementation
// for practice of coding styles
// not a real 'best' copyFile implementation

const fs = require("fs");
const EventEmiter = require("events");


function Copier3(from, to) {
  EventEmiter.call(this);
  this._from = from;
  this._to = to;
}

Copier3.prototype = Object.create(EventEmiter.prototype);
Copier3.prototype.constructor = Copier3;

Copier3.prototype.copy = function(callback) {
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

module.exports=Copier3;
