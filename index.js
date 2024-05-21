#!/usr/bin/env node

const path = require('path');
const fs = require('node:fs');
const yargs = require("yargs");
const { execSync } = require('child_process');

console.log('process.argv', process.argv);
console.log(yargs.argv);

const currentPath = process.cwd();

function createPackageJson(currentPath) {
  const {storeUrl} = yargs.argv;

  let packageJson;
  try {
    packageJson = require(path.join(currentPath, 'package.json'));
  } catch (error) {
    console.log('package.json not found, creating one');
  } finally {
    packageJson = {
      name: storeUrl,
      scripts: {
        'theme:dev': `shopify dev --store=${storeUrl}`,
        'theme:push': `shopify push --store=${storeUrl}`,
      }
    };
  }
  const resolvedFileName = path.join(currentPath, 'package2.json');
  

  console.log('packageJson', packageJson);
  
  fs.writeFile(resolvedFileName, JSON.stringify(packageJson, null, 2), err => {
    if (err) {
      console.error(err);
      throw new Error(err);
    } else {
      // file written successfully
    }
  });
}

function main() {
  try {
    createPackageJson(currentPath);
  } catch (error) {
    console.log('error', error);
    process.exit(1);
  }
}

main();
