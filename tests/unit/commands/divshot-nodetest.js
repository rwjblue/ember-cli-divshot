'use strict';

var assert        = require('chai').assert;
var MockUI        = require('ember-cli/tests/helpers/mock-ui');
var MockAnalytics = require('ember-cli/tests/helpers/mock-analytics');
var Command       = require('ember-cli/lib/models/command');
var Task          = require('ember-cli/lib/models/task');
var RSVP          = require('rsvp');

var DivshotCommandBase = require('../../../lib/commands/divshot');

describe('divshot command', function() {
  var ui;
  var tasks;
  var analytics;
  var project;
  var fakeSpawn;
  var CommandUnderTest;
  var buildTaskCalled;
  var buildTaskReceivedProject;

  before(function() {
    CommandUnderTest = Command.extend(DivshotCommandBase);
  });

  beforeEach(function() {
    buildTaskCalled = false;
    ui = new MockUI();
    analytics = new MockAnalytics();
    tasks = {
      Build: Task.extend({
        run: function() {
          buildTaskCalled = true;
          buildTaskReceivedProject = !!this.project;

          return RSVP.resolve();
        }
      })
    };

    project = {
      isEmberCLIProject: function(){
        return true;
      }
    };
  });

  it('shells out to `divshot` command line utility', function() {
    return new CommandUnderTest({
      ui: ui,
      analytics: analytics,
      project: project,
      environment: { },
      tasks: tasks,
      runCommand: function(command, args) {
        assert.include(command, 'divshot-cli/bin/divshot.js');
        assert.deepEqual(args, ['push']);
      }
    }).validateAndRun(['push']);
  });

  it('accecpts `divshot` option arguments', function() {
    return new CommandUnderTest({
      ui: ui,
      analytics: analytics,
      project: project,
      environment: { },
      tasks: tasks,
      runCommand: function(command, args) {
        assert.include(command, 'divshot-cli/bin/divshot.js');
        assert.deepEqual(args, ['push', '--token', '123']);
      }
    }).validateAndRun(['push', 'token=123']);
  });

  it('runs build before running the command', function() {
    return new CommandUnderTest({
      ui: ui,
      analytics: analytics,
      project: project,
      environment: { },
      tasks: tasks,
      runCommand: function(command, args) {
        assert(buildTaskCalled,
            'expected build task to be called');
        assert(buildTaskReceivedProject,
            'expected build task to receive project');
      }
    }).validateAndRun(['push']);
  });
});

