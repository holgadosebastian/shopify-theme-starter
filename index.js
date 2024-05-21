#!/usr/bin/env node

const path = require('path');
const fs = require('node:fs');
const yargs = require("yargs");
const { execSync } = require('child_process');

console.log('process.argv', process.argv);
console.log(yargs.argv);

const currentPath = process.cwd();

try {
  createPackageJson(currentPath)
} catch (error) {
  console.log('error')
  process.exit(1);
}

async function createPackageJson(currentPath) {
  const packageJson = require(path.join(currentPath, 'package.json')) || {};
  const resolvedFileName = path.join(currentPath, 'package2.json');
  const {storeUrl} = yargs.argv;

  console.log('packageJson', packageJson);

  packageJson.scripts = {
    'theme:dev': `shopify dev --store=${storeUrl}`,
    'theme:push': `shopify push --store=${storeUrl}`,
  };
  
  packageJson.name = storeUrl;
  
  fs.writeFile(resolvedFileName, JSON.stringify(packageJson, null, 2), err => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });

  
}
