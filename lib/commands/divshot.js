module.exports = {
  name: 'divshot',
  description: 'Passes through commands to divshot-cli.',

  availableOptions: [
    { name: 'token', type: String, aliases: ['t'], description: 'override your current user authentication token' },
    { name: 'timeout', type: String, description: 'set command timeout, in milliseconds' },
    { name: 'app', type: String, aliases: ['a'], description: "override the directory's app name" },
    { name: 'config', type: String, aliases: ['c'], description: 'use a different config file' },
    { name: 'org', type: String, aliases: ['o'], description: 'set command to operate on the given organization' }
  ],

  runCommand: function(command, args) {
    var path    = require('path');
    var RSVP    = require('rsvp');
    var Promise = RSVP.Promise;
    var spawn   = require('child_process').spawn;
    return new Promise(function(resolve, reject) {
      var child = spawn(command, args);
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
      analytics: this.analytics,
      project: this.project
    });

    commandOptions.environment = commandOptions.environment || 'production';
    commandOptions.outputPath = 'dist';
    return buildTask.run(commandOptions);
  },

  buildDivshotArgs: function(options){
    var divshotOptArgs = [];
    var possibleOptions = [];
    this.availableOptions.forEach(function(available){
      possibleOptions.push(available.name);
    });
    Object.keys(options).forEach(function(optionKey){
      if(possibleOptions.indexOf(optionKey) > -1){
        divshotOptArgs.push('--' + optionKey);
        divshotOptArgs.push(options[optionKey]);
      }
    });
    return divshotOptArgs;
  },

  run: function(options, rawArgs) {
    var self = this;
    var path = require('path');
    var command = path.join(__dirname, '..', '..', 'node_modules', 'divshot-cli', 'bin', 'divshot.js');
    var divshotArgs = rawArgs.concat(this.buildDivshotArgs(options));
    return this.triggerBuild(options)
      .then(function() {
        return self.runCommand(command, divshotArgs);
      });
  }
};
