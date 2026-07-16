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
    const [mdString, htmlString1, htmlString2] = await Promise.all([
      fetchFile("./test/input.md"),
      fetchFile("./test/output1.html"),
      fetchFile("./test/output2.html"),
    ]);

    const result1 = await markdownToHtml(mdString, true);

    assert.strictEqual(result1.trim(), htmlString1.trim());

    const result2 = await markdownToHtml(mdString, false);

    assert.strictEqual(result2.trim(), htmlString2.trim());
  });
});
