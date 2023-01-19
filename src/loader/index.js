const fs = require("fs");

const loadFile = (filePath) => {
  return new Promise((rej, res) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) rej(err);
      res(data);
    });
  });
};

module.exports = loadFile;
