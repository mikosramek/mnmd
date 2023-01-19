/*
# H1
## H2
### H3

<vb>visually bold text</vb> -> span with styling
<sb>semantically bold text</sb> -> <strong> Strong Importance

<vi>visually italic text</vi> -> span with styling
<si>semantically italic text</si> -> <i> Idiomatic Text

code: `code` -> span with styling

line: ---
link: [title](https://www.example.com) -> []()
image: ![alt text](image.jpg) -> ![]()

*/

const heading = require("./heading");
const paragraph = require("./paragraph");
const inline = require("./inline");
const image = require("./image");

const parseLine = (line: string) => {
  const isHeading = heading.checkIfHeading(line);
  const isParagraph = paragraph.checkIfParagraph(line);
  // replace with in-line stuff if heading or paragraph
  if (isHeading || isParagraph) {
    if (isHeading) {
      line = heading.parseHeading(line);
    } else {
      line = paragraph.parseParagraph(line);
    }
    line = inline.parseInlines(line);
  } else {
    // plain link, image, line
    if (image.checkIfImage(line)) {
      line = image.parseImage(line);
    } else if (inline.checkIfLink(line)) {
      line = inline.parseLink(line);
    } else {
      line = inline.parseLine(line);
    }
  }
  return line;
};

const convertToHTML = (post: string) => {
  let html = "";
  const lines = post.split(/\r?\n/);
  lines.forEach((line) => {
    html += parseLine(line) + "\n";
  });
  return `
    ${html}
  `;
};

module.exports = convertToHTML;
