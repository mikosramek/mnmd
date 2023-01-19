const imageCheck = new RegExp(/!(\[.*?\])(\(.*?\))/);

function imageReplacer(match: string, p1: string, p2: string, p3: string) {
  const shaveSides = (copy: string) => {
    return copy.substring(1, copy.length - 1);
  };
  const replacement = `<img src="${shaveSides(
    p2
  )}" class="mnmd-image" alt="${shaveSides(p1)}" />`;
  return replacement;
}

exports.checkIfImage = (line: string) => imageCheck.test(line);

exports.parseImage = (line: string) => {
  return line.replace(imageCheck, imageReplacer);
};
