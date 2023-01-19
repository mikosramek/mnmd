const paragraphCheck = new RegExp(/^(\w|`|<)/);

exports.checkIfParagraph = (line: string) => paragraphCheck.test(line);

exports.parseParagraph = (line: string) => {
  return `<p class="mnmd-paragraph">${line}</p>`;
};
