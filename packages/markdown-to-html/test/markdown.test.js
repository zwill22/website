import assert from "node:assert";
import fs from "fs/promises";
import markdownToHtml from "../index.js";

async function fetchFile(path) {
  const inputString = await fs.readFile(path, {
    encoding: "utf8",
  });

  return inputString;
}

describe("Conversion", () => {
  it("Markdown to HTML", async () => {
    const [mdString, htmlString] = await Promise.all([
      fetchFile("./test/input.md"),
      fetchFile("./test/output.html"),
    ]);

    const result = await markdownToHtml(mdString);

    assert.strictEqual(result.trim(), htmlString.trim());
  });
});
