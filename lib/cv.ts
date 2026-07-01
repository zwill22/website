import { latexToReact } from "@/lib/converter";
import fs from "fs/promises";

async function fetchCVData() {
  const cvString = await fs.readFile(
    "/Users/zackwilliams/Documents/CV/cv2024.tex",
    {
      encoding: "utf8",
    },
  );

  return cvString;
}

export async function fetchCV() {
  const data = await fetchCVData();

  return latexToReact(data);
}
