export interface FileData {
  source: string;
  owner: string;
  repo: string;
  path: string;
  id: string;
}

export function getFileData(project: string): FileData {
  const regex =
    /(\w.*?)_repo_(\w.*?)_(\w.*?)_path_(\w.*?)_([a-zA-Z\d]+)_(\d+)/gm;

  const m = regex.exec(project);
  if (!m) {
    throw new Error("Invalid project code");
  }

  const source = m[1];
  const owner = m[2];
  const repo = m[3];
  const path = `${m[4].replaceAll("_", "/")}.${m[5]}`;
  const id = m[6];

  const out = {
    source: source,
    owner: owner,
    repo: repo,
    path: path,
    id: id,
  };

  return out;
}
