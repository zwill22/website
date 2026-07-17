import { latexToReact } from "@/lib/converter";
import { fetchContent } from "@/lib/github";
import bibtexParse from "@orcid/bibtex-parse-js";
import { Octokit } from "octokit";

const owner = (() => {
  const val = process.env.GITHUB_CV_REPO_OWNER;

  if (!val) {
    throw new Error("Cannot find environment variable: GITHUB_CV_REPO_OWNER");
  }

  return val;
})();

const repo = (() => {
  const val = process.env.GITHUB_CV_REPO_NAME;

  if (!val) {
    throw new Error("Cannot find environment variable: GITHUB_CV_REPO_NAME");
  }

  return val;
})();

const authToken = (() => {
  const token = process.env.GITHUB_CV_ACCESS_TOKEN;

  if (!token) {
    throw new Error("Cannot find environment variable: GITHUB_CV_ACCESS_TOKEN")
  }

  return token;
})();

const auth = new Octokit({
  auth: authToken,
});

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

    return `${name}\\ \\emph{et al.}`;
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

function processLatex(inputData: string, bibData: BibEntry[]) {
  let data1 = addBibLinks(inputData, bibData);

  data1 = data1.replace(/\\CPP/gm, "C++");
  data1 = data1.replace(/\\CS/gm, "C\#");
  data1 = data1.replace("\\LaTeX", "LaTeX");
  data1 = data1.replace(/\\makeheading{(\s+\%?\\.*)*\s?}/gm, "");

  return data1;
}

const cvFile = (() => {
  const file = process.env.CV_FILE;

  if (!file) {
    throw new Error("Cannot find environment variable: CV_FILE");
  }

  return file;
})();

const bibFile = (() => {
  const file = process.env.BIB_FILE;

  if (!file) {
    throw new Error("Cannot find environment variable: BIB_FILE");
  }

  return file;
})();

export async function fetchCV() {
  const [data, bibData] = await Promise.all([
    fetchContent(owner, repo, cvFile, auth),
    fetchContent(owner, repo, bibFile, auth),
  ]);

  const bib = bibtexParse.toJSON(bibData);

  const fullData = processLatex(data, bib);

  return latexToReact(fullData);
}
