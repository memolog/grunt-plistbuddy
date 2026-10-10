'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFile } = require('child_process');
const { promisify } = require('util');

const execute = promisify(execFile);
const plistbuddy = '/usr/libexec/PlistBuddy';

if (!fs.existsSync(plistbuddy)) {
  console.log('SKIP: these integration tests require macOS PlistBuddy.');
  process.exit(0);
}

let task;
let rejectTask;
require('../tasks/plistbuddy')({
  registerMultiTask(name, description, callback) {
    assert.strictEqual(name, 'plistbuddy');
    task = callback;
  },
  util: {
    spawn(options, callback) {
      execFile(options.cmd, options.args, callback);
    }
  },
  warn(message) {
    rejectTask(new Error(message));
  }
});

function run(data) {
  return new Promise((resolve, reject) => {
    rejectTask = reject;
    task.call({
      data,
      options(defaults) { return defaults; },
      async() { return resolve; }
    });
  });
}

async function main() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'grunt-plistbuddy-test-'));
  const src = path.join(directory, 'App Info.plist');
  try {
    fs.writeFileSync(src, '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" ' +
      '"http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n' +
      '<plist version="1.0"><dict/></plist>\n');

    await run({ method: 'Add', entry: ':CFBundleVersion', type: 'string', value: '1.0', src });
    await run({ method: 'Set', entry: ':CFBundleVersion', value: '1.0.1', src });
    const version = await execute(plistbuddy, ['-c', 'Print :CFBundleVersion', src]);
    assert.strictEqual(version.stdout.trim(), '1.0.1');
    console.log('PASS: add and update a string');

    await run({ method: 'Add', entry: ':UIBackgroundModes', type: 'array', src });
    await run({ method: 'Add', entry: ':UIBackgroundModes:0', type: 'string', value: 'audio', src });
    await run({ method: 'Add', entry: ':UIBackgroundModes:1', type: 'string', value: 'location', src });
    const array = await execute(plistbuddy, ['-c', 'Print :UIBackgroundModes', src]);
    assert.deepStrictEqual(array.stdout.trim().split('\n').map(line => line.trim()),
      ['Array {', 'audio', 'location', '}']);
    console.log('PASS: create an array with audio and location (issue #5)');
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
