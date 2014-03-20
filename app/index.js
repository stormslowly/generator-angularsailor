'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var AngularsailorGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      return;
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

    // var done = this.async();

    var appPath = path.join('..', path.basename(process.cwd()));
    var args = ['new', appPath, '--' + this.renderEngine ];

    console.log(args.join(''));

    // var newSails = this.spawnCommand('sails', args);
    // newSails.on('close', function (code) {
    //   console.log('new Sails app with return code ', code);
    //   done();
    // });
  },

  app: function () {
    // this.mkdir('app');
    this.mkdir(path.join('assets', 'viewpartials'));
    this.copy('_main.html', path.join('assets', 'viewpartials', 'main.html'));
    this.copy('_navbar.html', path.join('assets', 'viewpartials', 'navbar.html'));

    this.copy('_.bowerrc', '.bowerrc');
    // this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');


    this.mkdir(path.join('assets', 'scripts'));
    this.mkdir(path.join('assets', 'scripts', 'controllers'));
    this.mkdir(path.join('assets', 'scripts', 'serices'));

    this.copy(path.join('scripts', 'app.js'),
              path.join('assets', 'scripts', 'app.js'));

    this.copy(path.join('scripts', 'controllers', 'main.js'),
              path.join('assets', 'scripts', 'controllers', 'main.js'));

    this.copy(path.join('scripts', 'controllers', 'navbar.js'),
              path.join('assets', 'scripts', 'controllers', 'navbar.js'));

    this.copy(path.join('scripts', 'services', 'budgetitem.js'),
              path.join('assets', 'scripts', 'services', 'budgetitem.js'));

    this.copy(path.join('scripts', 'app.js'),
              path.join('assets', 'scripts', 'app.js'));

    this.bulkCopy('_index.ejs', path.join('views', 'home', 'index.ejs'));

  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = AngularsailorGenerator;