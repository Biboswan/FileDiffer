#!/usr/bin/env node

'use strict';

const path = require('path');
const lineByLine = require('n-readlines');
const args = require('minimist')(process.argv.slice(2), {
  boolean: ['help', 'diff'],
  string: ['file1', 'file2'],
});

const BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);

if (args.help) {
  printHelp();
} else if (args.diff) {
  const line1 = new lineByLine(path.join(BASE_PATH, args.file1));
  const line2 = new lineByLine(path.join(BASE_PATH, args.file2));
  let i = 0;
  let l1, l2;
  while ((l1 = line1.next())) {
    l2 = line2.next();
    i++;

    if (l1.toString() !== l2.toString()) {
      console.log(i + ' l1: ' + l1 + ' l2: ' + l2);
    }
  }
}

function printHelp() {
  console.log('File Differ: Find the differences between similar files');
  console.log('');
  console.log('--help                  print this help');
  console.log('--file1={FILENAME}      original file');
  console.log('--file2={FILENAME}      changed file');
  console.log('--diff                  diff file');
}

// node ./index.js --diff --file1=out.txt --file2=noutput.txt > output.txt
