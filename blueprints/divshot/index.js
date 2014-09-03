var fs = require('fs');
var path = require('path');

// implementation from https://github.com/stefanpenner/ember-cli/pull/1857
//
// remove this inline once 0.0.43 is shipped
function insertIntoFile(pathRelativeToProjectRoot, contentsToInsert, providedOptions) {
  var fullPath          = path.join(this.project.root, pathRelativeToProjectRoot);
  var originalContents  = '';
  var contentsToWrite;

  if (fs.existsSync(fullPath)) {
    originalContents = fs.readFileSync(fullPath, { encoding: 'utf8' });
  }

  var contentsToWrite   = originalContents;

  var options           = providedOptions || {};
  var alreadyPresent    = originalContents.indexOf(contentsToInsert) > -1;
  var insert            = !alreadyPresent;

  if (options.force) { insert = true; }

  if (insert) {
    contentsToWrite += contentsToInsert;
  }

  var returnValue = {
    path: fullPath,
    originalContents: originalContents,
    contents: contentsToWrite,
    inserted: false
  };

  if (contentsToWrite !== originalContents) {
    returnValue.inserted = true;

    return fs.writeFileSync(fullPath, contentsToWrite, { encoding: 'utf8' });
  }
};

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    var insertFunc = this.insertIntoFile || insertIntoFile;

    return insertFunc.call(this, '.gitignore', '.divshot-cache');
  }
}
