const headingCheck = new RegExp(/^(#+)\W/);
exports.parseHeading = (line: string) => {
  // if it is a header
  if (headingCheck.test(line)) {
    // determine number of #s
    const segments = line.split(" ");
    if (segments.length > 0) {
      const hashCount = segments[0].length;
      return `<h${hashCount} class="mnmd-heading mnmd-heading-${hashCount}">${line.slice(
        hashCount + 1
      )}</h${hashCount}>`;
    }
  }
  return line;
};

exports.checkIfHeading = (line: string) => headingCheck.test(line);
