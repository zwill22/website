import assert from "node:assert";
import fs from "fs/promises";
import latexToHtml from "../index.js";

async function fetchFileContents(path) {
  const cvString = await fs.readFile(path, {
    encoding: "utf8",
  });

  return cvString;
}

describe("Check conversion", () => {
  it("should be successful", async () => {
    const [input, output] = await Promise.all([
      fetchFileContents("./test/input.tex"),
      fetchFileContents("./test/output.html"),
    ]);

    const result = await latexToHtml(input);

    assert.strictEqual(result.trim(), output.trim());
  });
});
