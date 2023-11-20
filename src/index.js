// index.js
const { existsSync, mkdirSync, writeFileSync } = require('fs');
const { join } = require('path');

function createFile() {
  const folderName = 'TargetFolder';
  const fileName = 'targetfile.json';
  const filePath = join(folderName, fileName);
  const unixTimestamp = Math.floor(Date.now() / 1000);
  const data = { timestamp: unixTimestamp };
  const jsonData = JSON.stringify(data, null, 2);

  if (!existsSync(folderName)) {
    mkdirSync(folderName, { recursive: true });
    console.log(`Folder '${folderName}' created.`);
  }

  if (!existsSync(filePath)) {
    writeFileSync(filePath, jsonData);
    console.log(`File '${fileName}' created in '${folderName}'.`);
  } else {
    writeFileSync(filePath, jsonData);
    console.log(`File '${fileName}' already exists in '${folderName}'. Regenerating....`);
  }
}

//module.exports = createFile;
