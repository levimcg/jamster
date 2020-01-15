#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs-extra');
const matter = require('gray-matter');
const pkg = require('./package.json');
const program = require('commander');
const { cosmiconfigSync } = require('cosmiconfig');

program.version(pkg.version);
program
  .option('-c, --config <configFile>')
  .arguments('<file>')
  .action(file => {
    let config;
    const explorer = cosmiconfigSync('md-generate');
    if (program.config) {
      config = explorer.load(`./${program.config}`);
    } else {
      config = explorer.search();
    }
    
    if (!config) {
      config = require('./lib/defaults');
    }
    const currentWorkingDir = process.cwd();
    const filePath = `${currentWorkingDir}/${file}`;
    const frontMatterContents = matter.stringify('', config.config);

    fs.outputFile(filePath, frontMatterContents, err => {
      if (err) {
        console.log(err);
        process.exit(1);
      } else {
        console.log(
          chalk.green.bold(`\n 🎉 A new file was create at: ${filePath} \n`)
        );
      }
    });
  });

program.parse(process.argv);