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
  },

  contentFor: function(type, config) {
    if (type === 'body' && config.environment === 'production') {
      return '<script src="/__/env.js"></script>';
    }
  }
}
