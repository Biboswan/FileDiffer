#!/usr/bin/env node

const path = require('path');
const lineByLine = require('n-readlines');

const args = require('minimist')(process.argv.slice(2), {
  boolean: ['help', 'version'],
  string: ['file1', 'file2'],
  alias: { h: 'help', v: 'version' },
});

const BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);

if (args.help) {
  printHelp();
} else if (args._.includes('byline')) {
  const { file1, file2 } = args;
  if (file1 == undefined || file2 == undefined) {
    printByLineHelp();
  } else {
    try {
      const file1path = path.join(BASE_PATH || '', file1);
      const file2path = path.join(BASE_PATH || '', file2);

      const line1 = new lineByLine(file1path);
      const line2 = new lineByLine(file2path);

      let i = 1;
      let l1, l2;
      while ((l1 = line1.next()) && (l2 = line2.next())) {
        if (l1.toString() != l2.toString()) {
          console.log(`${i}: file1: ${l1} | file2: ${l2}`);
        }
        i++;
      }

      while ((l1 = line1.next())) {
        console.log(`${i}: file1: ${l1} | file2:`);
        l1 = line1.next();
        i++;
      }

      while ((l2 = line2.next())) {
        console.log('46j');
        console.log(`${i}: file1:   | file2: ${l2}`);
        l2 = line2.next();
        i++;
      }
    } catch (err) {
      console.log(err.toString());
    }
  }
} else if (args.version) {
  console.log(require('./package').version);
} else {
  handleUnknownCommand();
}

function printHelp() {
  console.log('filediffer: A command line tool to compare files\n');
  console.log('Usage: filediffer [options]\n');
  console.log('Options:\n');
  console.log('-v, --version               output the version number');
  console.log('-h, --help                  show help');
  console.log('<command> -h                description of that command');
  console.log('byline                      logs unmatching lines side by side');
}

function handleUnknownCommand() {
  console.log('command not found\n');
  printHelp();
}

function printByLineHelp() {
  console.log('filediffer\n');
  console.log('byline  help\n');
  console.log('description\n');
  console.log('logs unmatching lines side by side');
  console.log('options:\n');
  console.log(
    '--file1      Path of first file. Can pass relative path if BASE_PATH is added in the environment'
  );
  console.log('--file2      Path of second file');
}

// node ./index.js --diff --file1=out.txt --file2=noutput.txt > output.txt
