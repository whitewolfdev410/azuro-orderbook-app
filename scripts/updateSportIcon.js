// This script updates all sport icons in the src/icons/sports directory.
// It replaces the fill="currentColor" and stroke="currentColor" attributes with fill={getSportIconColor(props.gradient)} and stroke={getSportIconColor(props.gradient)} respectively.
// It also imports the getSportIconColor function from the index.tsx file.
const fs = require('fs')
const path = require('path')

const directoryPath = path.resolve(__dirname, '../src/icons/sports')
const getSportIconColorImport = `import { getSportIconColor } from '.';`

const updateFileContent = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8')

    const isIncluded = data.includes('getSportIconColor')
    if (isIncluded) {
      console.log(`File ${filePath} already updated.`)
      return
    }

    const updatedContent = data
      .replace(
        /import React from 'react';/,
        `import React from 'react';\n${getSportIconColorImport}`
      )
      .replace(
        /<path([^>]+)fill="currentColor"([^>]*)\/>/g,
        `<path$1fill={getSportIconColor(props.gradient)}$2/>\n      {props.children}`
      )
      .replace(
        /stroke="currentColor"/g,
        `stroke={getSportIconColor(props.gradient)}`
      )

    fs.writeFileSync(filePath, updatedContent, 'utf8')
    console.log(`File ${filePath} updated successfully.`)
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
  }
}

;(() => {
  try {
    const files = fs.readdirSync(directoryPath)
    for (const file of files) {
      const filePath = path.join(directoryPath, file)
      if (file.endsWith('.tsx') && file !== 'index.tsx') {
        updateFileContent(filePath)
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error)
  }
})()
