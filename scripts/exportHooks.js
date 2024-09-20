// This script will export all hooks from the hooks folder to the index.ts file
// It reads all files in the hooks folder, extracts the default export name from each file, and writes the export statements to the index.ts file
// The script uses the getExportDefault utility function to extract the default export name from the file content
// The script then writes the export statements to the index.ts file
// The script is useful for exporting hooks in a folder to a single index.ts file for easier import in other files
// Example
// ```sh
// node scripts/exportHooks.js
// ```
const fs = require('fs');
const path = require('path');
const getExportDefault = require('./utils/getExportDefault');

const folderPath = path.resolve(__dirname, '../src/hooks');
const indexPath = path.resolve(folderPath, 'index.ts');

if (!fs.existsSync(folderPath)) {
  console.error(`Hooks folder not found: ${folderPath}`);
  process.exit(1);
}

if (fs.existsSync(indexPath)) {
  fs.unlinkSync(indexPath);
  console.log(`Deleted file: ${indexPath}`);
}

const files = fs.readdirSync(folderPath);

let exportAs = '';
let exportStar = '';

for (const file of files) {
  if (!file.startsWith('use')) continue;
  const content = fs.readFileSync(path.resolve(folderPath, file), 'utf8');

  exportStar += `export * from './${file.replace('.ts', '')}';\n`;

  const hookName = getExportDefault(content);
  if (!hookName) continue;

  console.log(`Exporting hook: ${hookName}`);
  exportAs += `export { default as ${hookName} } from './${file.replace('.ts', '')}';\n`;
}

const fileContent = `${exportAs}\n${exportStar}`;

console.log(`Writing to file: ${indexPath}`);
console.log(fileContent);

fs.writeFileSync(indexPath, fileContent, 'utf8');
