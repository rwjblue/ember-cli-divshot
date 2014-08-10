module.exports = {
  name: 'ember-cli-divshot',

  includedCommands: function() {
    return {
      'divshot': require('./lib/commands/divshot')
    }
  }
}
