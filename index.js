#!/usr/bin/env node

const path = require('path');
const fs = require('node:fs');
const yargs = require("yargs");
const { execSync } = require('child_process');
const readline = require('readline-sync'); 
const { cpSync } = require('fs');

console.log('process.argv', process.argv);
console.log(yargs.argv);

const currentPath = process.cwd();

function createPackageJson(currentPath, { storeUrl}) {
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

async function copyFilesAndDirectories(callback) {
  try {
    const sourceDir = path.join(__dirname, 'templates', 'default');
    console.log('sourceDir', sourceDir);
    // Copy a directory recursively
    cpSync(sourceDir, currentPath, { recursive: true });
    console.log('sourceDir was copied to destinationDir');

    // If everything goes well, call the callback with no error
    callback(null);
  } catch (err) {
    // If there is an error, call the callback with the error
    callback(err);
  }
}

function main() {
  try {
    const storeUrl = readline.question("Enter store myshopify url: ");

    createPackageJson(currentPath, { storeUrl });
    copyFilesAndDirectories(err => {
      if (err) {
        console.error('Error:', err.message);
      } else {
        console.log('All files and directory copied successfully');
      }
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
