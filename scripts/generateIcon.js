// This script generates a new icon component in the src/icons folder
// Usage: node scripts/generateIcon.js IconName
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)

const iconsFolder = path.resolve(__dirname, '../src/icons')

const iconName = args[0]
if (!iconName) {
  console.error('Icon name is required')
  process.exit(1)
}

const iconFile = path.resolve(iconsFolder, `./${iconName}.tsx`)
if (fs.existsSync(iconFile)) {
  console.error(`Icon ${iconName} already exists`)
  process.exit(1)
}

const fileContent = getIconCode(iconName)

console.log(`Creating icon ${iconName}...`)
console.log(fileContent)

fs.writeFileSync(iconFile, fileContent, 'utf-8')

execSync(`open ${iconFile}`)

function getIconCode(iconName) {
  return `import { IconProps } from './props';

export default function ${iconName} (props: Readonly<IconProps>) {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
  </svg>
}
`
}
