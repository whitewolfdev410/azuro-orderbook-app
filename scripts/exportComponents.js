// This script exports all components in a folder to an index.ts file
// It reads all files in the folder, extracts the default export name from each file, and writes the export statements to the index.ts file
// The script uses the getExportDefault utility function to extract the default export name from the file content
// The script then writes the export statements to the index.ts file, including the default export if it matches the folder name
// The script is useful for exporting components in a folder to a single index.ts file for easier import in other files
// Example
// ```sh
// node scripts/exportComponents.js src/components/Button
// ```
const fs = require('fs')
const path = require('path')
const getExportDefault = require('./utils/getExportDefault')

const args = process.argv.slice(2)
const folderPath = path.resolve(process.cwd(), args[0])
const indexPath = path.resolve(folderPath, 'index.ts')

if (!fs.existsSync(folderPath)) {
  console.error(`Folder not found: ${folderPath}`)
  process.exit(1)
}

if (fs.existsSync(indexPath)) {
  fs.unlinkSync(indexPath)
  console.log(`Deleted file: ${indexPath}`)
}

const files = fs.readdirSync(folderPath)

const defaultComponentName = folderPath.split('/').pop()

let exportAs = ''
let exportStar = ''
let exportDefault = ''

for (const file of files) {
  if (!file.endsWith('.tsx')) continue
  const content = fs.readFileSync(path.resolve(folderPath, file), 'utf8')

  exportStar += `export * from './${file.replace('.tsx', '')}';\n`

  const componentName = getExportDefault(content)
  if (!componentName) continue

  console.log(`Exporting component: ${componentName}`)
  exportAs += `export { default as ${componentName} } from './${file.replace('.tsx', '')}';\n`

  if (defaultComponentName === componentName) {
    exportDefault = `export { default } from './${file.replace('.tsx', '')}';\n`
  }
}

const fileContent = `${exportAs}\n${exportStar}\n${exportDefault}`

console.log(`Writing to file: ${indexPath}`)
console.log(fileContent)

fs.writeFileSync(indexPath, fileContent, 'utf8')
