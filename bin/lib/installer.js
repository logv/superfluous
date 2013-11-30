"use strict";

var program = require("commander");

var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var exec = require('child_process').exec;

var base_dir = path.join(__dirname,  "..", "default");
var cwd = process.cwd();

// Have to look inside top levels for routes.json file
function get_app_dir() {
  var resolved = cwd;

  if (program.dir) {
    resolved = path.resolve(cwd, program.dir);
  }

  var links = 100;
  while (resolved !== '/' && links > 0) {
    if (fs.existsSync(path.join(resolved, "routes.json"))) {
      return resolved;
    }
    resolved = path.resolve(resolved, "..");
    links -= 1;
  }

  return;
}

function create_superfluous_app(app_name) {
  // First check to see if current dir is a superfluous app
  var app_dir = get_app_dir();
  var dest_dir = path.resolve(cwd, app_name);

  // if it is, throw an error. Easy way is to look for routes.json file
  if (app_dir) {
    console.log(program.dir, "is already a superfluous app. Did you mean to update?");
  } else {
    console.log("Initializing a new superfluous app in", app_name);
    fse.copy(base_dir, app_name, function(err) {
      if (err) {
        console.log(err);
      } else {
        exec("npm link superfluous");
      }
    });
  }
}

function init_superfluous_app() {
  // First check to see if current dir is a superfluous app
  var app_dir = get_app_dir();
  var dest_dir = path.resolve(cwd, program.dir || ".");

  create_superfluous_app(program.dir || ".");
}

module.exports = {
  run: function() {
    program
      .option('-d, --dir [dir]', 'set the superfluous directory [dir]', '.')
      .version('0.0.1');

    program
      .command('create')
      .description('create a new superfluous app')
      .action(create_superfluous_app);

    program
      .command('init')
      .description('create a new superfluous app in the current directory')
      .action(init_superfluous_app);

    program
      .command('undo')
      .description('undo the last superfluous command')
      .action(function() {
        console.log('lol. did you really think it would be that easy?');
      });

    program.parse(process.argv);

  }
};
