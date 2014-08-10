var path = require('path');

module.exports = {
  name: 'ember-cli-divshot',

  includedCommands: function() {
    return {
      'divshot': require('./lib/commands/divshot')
    }
  },

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  }
}
