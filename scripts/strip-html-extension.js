/* eslint-disable no-console */
const glob = require('glob');
const fs = require('fs');

const root = process.cwd();

const stripHTML = (toStrip) => toStrip.split('.').slice(0, -1).join('.');

glob(`${root}/out/**/!(index).html`, {}, (err, files) => {
  const strippedFilenames = files.map((fileName) => {
    const newFile = stripHTML(fileName);
    fs.copyFileSync(fileName, newFile);
    fs.unlinkSync(fileName);
    return newFile;
  });
  console.log(`\nRemoved extensions for the following files: ${JSON.stringify(strippedFilenames)}`);
});
