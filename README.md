# grunt-plistbuddy

> PlistBuddy is the tool for manipulating plist file. This task is wrapper for PlistBuddy.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-plistbuddy --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-plistbuddy');
```

## Overview
PlistBuddy is the tool for manipulating plist file. This task is wrapper for PlistBuddy.

If you want more details of PlistBuddy, see [develper.apple.com](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man8/PlistBuddy.8.html)

In your project's Gruntfile, add a section named `plistbuddy` to the data object passed into `grunt.initConfig()`.

## Options

#### options.path
Type: `String`
Default value: `/usr/libexec/PlistBuddy`

The path for PlistBuddy. I think it's usually installed in /usr/libexec/PlistBuddy.

### Usage Examples

```js
grunt.initConfig({
  plistbuddy: {
    addShortVersion: {
      method: 'Add',
      entry: ':CFBundleShortVersionString',
      type: 'string',
      value: '1.0',
      src: 'YourApp-Info.plist'
    },
    setShortVersion: {
      method: 'Set',
      entry: ':CFBundleShortVersionString',
      value: '1.0',
      src: 'YourApp-Info.plist'
    },
    setVersion: {
      method: 'Set',
      entry: ':CFBundleVersion',
      value: '1.0.1',
      src: 'YourApp-Info.plist'
    },
    setBundleIdentifier: {
      method: 'Set',
      entry: ':CFBundleIdentifier',
      value: 'com.example.plistbuddy',
      src: 'YourApp-Info.plist'
    },
    rootInfo: {
      method: 'Set',
      entry: 'PreferenceSpecifiers:1:Key',
      value: '1.0',
      src: 'yourAppDir/Resources/Settings.bundle/Root.plist'
    },
    rootInfoKey: {
      method: 'Set',
      entry: 'PreferenceSpecifiers:1:DefaultValue',
      value: '1.0',
      src: 'yourAppDir/Resources/Settings.bundle/Root.plist'
    }
  }
})
```
