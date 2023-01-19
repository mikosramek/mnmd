const path = require("path");
const mnmd = require("../dist/index");

const compileBlogPosts = async () => {
  console.log("RUNNING TESTS");
  try {
    console.log("** LOAD POST");
    const post = await mnmd.load(path.resolve(__dirname, "test.md"));
    console.log("CONVERT POST");
    const html = mnmd.convert(post);
    console.log(html);
  } catch (error) {
    console.log("ERROR");
    console.error(error);
  }
  console.log("TEST END");
};

compileBlogPosts();
