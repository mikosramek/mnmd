/*

<vb>visually bold text</vb> -> span with styling
<sb>semantically bold text</sb> -> <strong> Strong Importance

<vi>visually italic text</vi> -> span with styling
<si>semantically italic text</si> -> <i> Idiomatic Text

code: `code` -> span with styling

link: [title](https://www.example.com) -> []()

*/

function linkReplacer(match: string, p1: string, p2: string, p3: string) {
  const shaveSides = (copy: string) => {
    return copy.substring(1, copy.length - 1);
  };
  const replacement = `<a href='${shaveSides(
    p2
  )}' class='mnmd-link'>${shaveSides(p1)}</a>`;
  return replacement;
}

const linkCheck = new RegExp(/(\[.*?\])(\(.*?\))/gi);
exports.checkIfLink = (line: string) => linkCheck.test(line);
exports.parseLink = (line: string) => {
  return line.replace(linkCheck, linkReplacer);
};

exports.parseLine = (line: string) =>
  line.replace(/---/gi, "<div class='mnmd-linebreak'></div>");

exports.parseInlines = (line: string) => {
  // visually-bold
  line = line.replace(/<vb>/gi, "<span class='mnmd-visually-bold'>");
  line = line.replace(/<\/vb>/gi, "</span>");
  // semantically-bold
  line = line.replace(/<sb>/gi, "<strong class='mnmd-semantically-bold'>");
  line = line.replace(/<\/sb>/gi, "</strong>");
  // visually-italic
  line = line.replace(/<vi>/gi, "<span class='mnmd-visually-italic'>");
  line = line.replace(/<\/vi>/gi, "</span>");
  // semantically-italic
  line = line.replace(/<si>/gi, "<i class='mnmd-semantically-italic'>");
  line = line.replace(/<\/si>/gi, "</i>");
  // link
  line = line.replace(linkCheck, linkReplacer);
  // code
  line = line.replace(/`(.*?)`/gi, "<span class='mnmd-code'>$1</span>");
  return line;
};
