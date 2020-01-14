#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs-extra');
const matter = require('gray-matter');
const pkg = require('./package.json');
const program = require('commander');
const { prompt } = require('inquirer');
const questions = require('./lib/questions');

function formatDate(date) {
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

program.version(pkg.version);
program
  .arguments('<file>')
  .action(file => {
    prompt(questions)
      .then(answers => {
        const currentWorkingDir = process.cwd();
        const filePath = `${currentWorkingDir}/${file}`;
        const frontMatterContents = matter.stringify('', {
          title: answers.title,
          description: answers.description,
          date: formatDate(new Date()),
          tags: answers.tags
        });

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
      })
  });

program.parse(process.argv);