module.exports = function (grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  'use strict';

  grunt.registerMultiTask('plistbuddy', 'maniplate plist with PlistBuddy', function () {
    var PlistBuddy = this.options && this.options.path ? this.options.path : '/usr/libexec/PlistBuddy',
      method = this.data.method,
      src = this.data.src,
      cb = this.async();

    var cmd = [method];
    var commands = ['file', 'entry', 'entrySrc', 'entryDst', 'type', 'value'];

    for (var i = 0; i < commands.length; i++) {
      if (this.data[commands[i]]) {
        cmd.push(this.data[commands[i]]);
      }
    }

    if ((/import/i).test(method)) {
      cmd = [this.data.entry, this.data.file];
    }

    cmd = cmd.join(' ');

    grunt.util.spawn({
      cmd: PlistBuddy,
      args: ['-c', cmd, src]
    }, function (error, result, code) {
      if (error) {
        grunt.warn('got error on '+ cmd + ' at ' + src);
      }
      cb();
    });
  });
};
