const path = require('path');
const cmd = require('./util/cmd');
const assert = require('assert');

describe('byline', () => {
  const cliPath = path.join(__dirname, '../index.js');
  const cliProcess = cmd.create(cliPath, '.');

  it('Logged only all unmatched lines', async () => {
    const response = await cliProcess.execute([
      'byline',
      '--file1',
      './test/file1.txt',
      '--file2',
      './test/file2.txt',
    ]);
    const expectedResponse = [
      '5: file1: 6  Yup | file2: 16  Yup',
      '9: file1: 2 | file2: 27',
    ]
      .join('\n')
      .concat('\n');
    assert.equal(response, expectedResponse);
  });
});

// node ./index.js byline --file1 /test/file1.txt --file2 ./test/file2.txt > output.txt
