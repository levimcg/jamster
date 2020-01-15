#!/usr/bin/env node

const chalk = require('chalk');
const { cosmiconfigSync } = require('cosmiconfig');
const fs = require('fs-extra');
const matter = require('gray-matter');
const pkg = require('./package.json');
const program = require('commander');

program.version(pkg.version);
program
  .option('-c, --config <configFile>', 'Specify which configuration file you want to use.')
  .arguments('<file>')
  .action(file => {
    const explorer = cosmiconfigSync('jamster');
    let config;
    
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
        console.log(chalk.blueBright('Exiting'));
        process.exit(1);
      } else {
        console.log(
          chalk.greenBright.bold(`\n 🎉 A new file was create at: ${filePath} \n`)
        );
      }
    });
  });

program.parse(process.argv);