import { latexToReact } from "@/lib/converter";
import fs from "fs/promises";
import bibtexParse from "@orcid/bibtex-parse-js";

async function fetchFile(path: string) {
  const cvString = await fs.readFile(path, {
    encoding: "utf8",
  });

  return cvString;
}

interface BibEntryTags {
  author: string;
  title: string;
  journal?: string;
  number?: string;
  volume?: string;
  pages?: string;
  month: string;
  year: string;
  doi: string;
}

interface BibEntry {
  citationKey: string;
  entryType: string;
  entryTags: BibEntryTags;
}

function authorName(input: string) {
  const names = input.split(",");

  const firstName = names.at(1)!;
  const lastName = names.at(0)!;

  return `${firstName} ${lastName}`;
}

function getAuthors(input: string) {
  const authors = input.split("and");

  if (authors.length > 4) {
    const author = authors.at(0)!;
    const name = authorName(author);

    return `${name}\\emph{et al.}`;
  }

  let output = "";
  for (let i = 0; i < authors.length; i++) {
    const author = authors[i];

    const name = authorName(author);

    if (i < authors.length - 2) {
      output += `${name}, `;
    } else if (i === authors.length - 2) {
      output += `${name}, and `;
    } else {
      output += name;
    }
  }

  return output;
}

function addBibLinks(latex: string, bib: BibEntry[]) {
  let output = latex;
  for (let i = 0; i < bib.length; i++) {
    const entry = bib[i];

    const key = entry.citationKey;
    const tags = entry.entryTags;

    const author = getAuthors(tags.author);
    const month =
      String(tags.month).charAt(0).toUpperCase() + String(tags.month).slice(1);

    let text = `${author}. "${tags.title}". `;
    if (tags.journal) {
      text += `\\emph{${tags.journal}} ${tags.volume}, no. ${tags.number} (${month} ${tags.year}): ${tags.pages}.`;
    } else {
      text += `${month} ${tags.year}. `;
    }

    output = output.replace(
      `\\fullcite{${key}}`,
      `\\href{https://www.doi.org/${tags.doi}}{${text}}`,
    );
  }

  return output;
}


export async function fetchCV() {
  const [data, bibData] = await Promise.all([
    fetchFile("CVFILE"),
    fetchFile("BIBFILE"),
  ]);

  const bib = bibtexParse.toJSON(bibData);

  const fullData = addBibLinks(data, bib);

  return latexToReact(fullData);
}
