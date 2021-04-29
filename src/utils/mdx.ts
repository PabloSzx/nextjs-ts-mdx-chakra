import { promises } from "fs";
import { join } from "path";

export function getDocsFolder(dirRelativeToRoot: string) {
  return join(process.cwd(), dirRelativeToRoot);
}

export async function getDocsPaths(dirRelativeToRoot: string) {
  const docsPath = getDocsFolder(dirRelativeToRoot);

  const docsFilePaths = await promises.readdir(docsPath);
  return docsFilePaths.filter((path) => /\.mdx?$/.test(path));
}
