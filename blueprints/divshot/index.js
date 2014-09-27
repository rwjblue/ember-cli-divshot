var fs = require('fs');
var path = require('path');

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    return this.insertIntoFile('.gitignore', '.divshot-cache');
  }
}
