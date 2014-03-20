'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var AngularsailorGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the Angularsailor generator.'));

    var prompts = [
      {
        name: 'appName',
        message: 'what would you like to call your app?',
        default: 'myApp'
      },
      {
        type: 'list',
        name: 'renderEngine',
        choices: ['jade', 'ejs'],
        message: 'Which render engine you like to use?',
        default: 'ejs'
      }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.renderEngine = props.renderEngine;

      done();
    }.bind(this));
  },

  newSailsApp: function () {

    var done = this.async();
    var args = ['new', this.appName, '--' + this.renderEngine ];

    var newSails = this.spawn('sails', args);
    newSails.on('close', function (code) {
      console.log('new Sails app with return code ', code);
      done();
    });
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = AngularsailorGenerator;