import "mocha";
import "dotenv/config";
import { assert } from "chai";
import { fetchCV } from "@/lib/cv";
import { HtmlValidate } from "html-validate";

describe("fetchCV", () => {
  it("Validate CV HTML", async () => {
    const cv = await fetchCV();

    const validator = new HtmlValidate();

    const result = await validator.validateString(cv);

    assert.isTrue(result.valid);
  });
});
