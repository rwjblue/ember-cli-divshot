module.exports = {
  name: 'divshot',
  description: 'Passes through commands to divshot-cli.',

  init: function() {
  },

  runCommand: function(command, args) {
    var path    = require('path');
    var RSVP    = require('rsvp');
    var Promise = RSVP.Promise;
    var spawn   = require('child_process').spawn;

    return new Promise(function(resolve, reject) {
      var child = spawn(command, rawArgs);

      var result = {
        output: [],
        errors: [],
        code: null
      };

      child.stdout.on('data', function (data) {
        var string = data.toString();

        console.log(string);

        result.output.push(string);
      });

      child.stderr.on('data', function (data) {
        var string = data.toString();

        console.error(string);

        result.errors.push(string);
      });

      child.on('close', function (code) {
        result.code = code;

        if (code === 0) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  },

  triggerBuild: function(commandOptions) {
    var BuildTask = this.tasks.Build;
    var buildTask = new BuildTask({
      ui: this.ui,
      analytics: this.analytics
    });

    return buildTask.run(commandOptions);
  },

  run: function(options, rawArgs) {
    var self = this;
    var path = require('path');
    var command = path.join(__dirname, '..', '..', 'node_modules', 'divshot-cli', 'bin', 'divshot.js');

    return this.triggerBuild(options)
      .then(function() {
        return self.runCommand(command, rawArgs);
      });
  }
};
