const fs = require("fs");

const loadFile = (filePath: string) => {
  return new Promise((res, rej) => {
    fs.readFile(filePath, "utf-8", (err: Error, data: string) => {
      if (err) rej(err);
      res(data);
    });
  });
};

module.exports = loadFile;

export {};
