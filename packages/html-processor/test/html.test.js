import assert from "node:assert";
import fs from "fs/promises";
import processHTML from "../index.js";

async function fetchFile(path) {
  const inputString = await fs.readFile(path, {
    encoding: "utf8",
  });

  return inputString;
}

describe("Processor", () => {
  it("Processing HTML", async () => {
    const [inputHTML, expectedOutputHTML] = await Promise.all([
      fetchFile("./test/input.html"),
      fetchFile("./test/output.html"),
    ]);

    const outputHTML = await processHTML(
      inputHTML,
      "https://example.com/files",
    );

    assert.strictEqual(outputHTML.trim(), expectedOutputHTML.trim());
  });
});
