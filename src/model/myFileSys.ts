const fs = require('fs');
const path = require('path');

export async function getLastCreatedFilePath(folderPath:string) {
  const files = fs.readdirSync(folderPath);

  if (files.length === 0) {
    // The folder is empty
    return null;
  }

  let lastCreatedFile = null;
  let lastCreationTime = 0;

  for (const file of files) {
    const filePath:string = path.join(folderPath, file);
    const stat = fs.statSync(filePath);

    // Compare creation times
    if (stat.birthtimeMs > lastCreationTime) {
      lastCreationTime = stat.birthtimeMs;
      lastCreatedFile = filePath;
    }
  }

  return lastCreatedFile;
}

