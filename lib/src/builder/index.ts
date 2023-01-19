"use strict";
const path = require("path");
const fs = require("fs");
const load = require("../loader");

type Replacements = Record<string, string>;

type Options = {
  template: string;
  replacements: Replacements;
  distFolder: string;
  slug: string;
};

const buildPage = ({ template, replacements, distFolder, slug }: Options) => {
  for (let [key, value] of Object.entries(replacements)) {
    template = template.replace(`%${key}%`, value);
  }
  return new Promise((res, rej) => {
    fs.writeFile(
      path.resolve(distFolder, `${slug}.html`),
      template,
      "utf-8",
      (err: Error) => {
        if (err) rej(err);
        res(true);
      }
    );
  });
};

const getCSS = () => {
  return new Promise((res, rej) => {
    load(path.resolve(__dirname, "..", "styles", "style.css"))
      .then((css: string) => {
        res(css);
      })
      .catch(rej);
  });
};

module.exports = {
  build: buildPage,
  getCSS,
};

export {};
