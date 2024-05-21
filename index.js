#!/usr/bin/env node

const path = require('path');
const fs = require('node:fs');
const yargs = require("yargs");
const packageJson = require('./package.json');

console.log(yargs.argv);

const {storeUrl} = yargs.argv;

packageJson.scripts = {
  'theme:dev': `shopify dev --store=${storeUrl}`,
  'theme:push': `shopify push --store=${storeUrl}`,
};

packageJson.name = storeUrl;
console.log("Current directory:", (path.resolve(__dirname, 'package2.json')));

const resolvedFileName = path.resolve(__dirname, 'package2.json');

fs.writeFile(resolvedFileName, JSON.stringify(packageJson, null, 2), err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});