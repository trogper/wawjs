module.exports = (bufs) => bufs.reduce((a, b) => a.length || 0 + b.length, 0);
