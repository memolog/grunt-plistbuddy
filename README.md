# grunt-plistbuddy

PlistBuddy is the tool for manipulating plist file. This task is wrapper for PlistBuddy.

If you want more details of PlistBuddy, see [develper.apple.com](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man8/PlistBuddy.8.html)

In your project's Gruntfile, add a section named `plistbuddy` to the data object passed into `grunt.initConfig()`.


# Getting Started
This plugin requires Grunt `^1.6.3` and Node.js `>=16`.

If you haven't used [Grunt](https://gruntjs.com/) before, be sure to check out the [Getting Started](https://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](https://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, install the latest stable Grunt release and this plugin in your project:

```shell
npm install --save-dev grunt@latest grunt-plistbuddy
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-plistbuddy');
```
# Options

## options.path
Type: `String`
Default value: `/usr/libexec/PlistBuddy`

The path for PlistBuddy. I think it's usually installed in /usr/libexec/PlistBuddy.

# Usage Examples

You can use the same arguments described manual. For more details, see ```man PlistBuddy```

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
