const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname);
const getSportIconColorImport = `import { getSportIconColor } from '.';`;

const updateFileContent = (filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    if (data.includes('getSportIconColor')) {
      console.log(`File ${filePath} already updated.`);
      return;
    }

    const updatedContent = data
      .replace(
        /import React from 'react';/,
        `import React from 'react';\n${getSportIconColorImport}`
      )
      .replace(
        /<path([^>]+)fill="currentColor"([^>]*)\/>/g,
        `<path$1fill={getSportIconColor(props?.gradient)}$2/>\n      {props.children}`
      )
      .replace(
        /stroke="currentColor"/g,
        `stroke={getSportIconColor(props?.gradient)}`
      );

    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
        return;
      }
      console.log(`File ${filePath} updated successfully.`);
    });
  });
};

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    if (file.endsWith('.tsx') && file !== 'index.tsx') {
      updateFileContent(filePath);
    }
  });
});
