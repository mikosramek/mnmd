const path = require("path");
const fs = require("fs");
const mnmd = require("../dist/index");

const compileBlogPosts = async () => {
  try {
    const post = await mnmd.load(path.resolve(__dirname, "test.md"));
    const html = mnmd.convert(post);

    let template = await mnmd.load(
      path.resolve(__dirname, "templates", "blog.html")
    );

    const distPath = path.resolve(__dirname, "dist");
    const css = await mnmd.builder.getCSS();

    await fs.writeFile(
      path.resolve(distPath, "mnmd.css"),
      css,
      "utf-8",
      (err) => {
        if (err) console.error(err);
      }
    );

    mnmd.builder.build({
      template,
      slug: "making-a-gargant",
      distFolder: distPath,
      replacements: {
        blog: html,
        title: "Making a Gargant",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

compileBlogPosts();
