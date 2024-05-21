#!/usr/bin/env node

const path = require('path');
const fs = require('node:fs');
const yargs = require("yargs");
const { execSync } = require('child_process');
const readline = require('readline-sync'); 

console.log('process.argv', process.argv);
console.log(yargs.argv);

const currentPath = process.cwd();

function createPackageJson(currentPath) {
  const storeUrl = readline.question("Enter store myshopify url: ");
  console.log(storeUrl);

  let packageJson;
  try {
    packageJson = require(path.join(currentPath, 'package.json'));
  } catch (error) {
    console.log('package.json not found, creating one');
    packageJson = {};
  } finally {
    packageJson.name = storeUrl;
    packageJson.scripts = {
      'theme:dev': `shopify dev --store=${storeUrl}`,
      'theme:push': `shopify push --store=${storeUrl}`,
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
    const {storeUrl} = yargs.argv;
    if (!storeUrl) throw Error('store url has not been defined, use --store-url={myshopify.com url}');
    createPackageJson(currentPath, { storeUrl});
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
