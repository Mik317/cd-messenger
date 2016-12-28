
var _         = require('lodash');
var chalk     = require('chalk');
var cl        = require('chalkline');
var Table     = require('cli-table2');

var messenger = {
  log: function (...params) {
    console.log(...params);
  },
  info: function (...params) {
    console.log(chalk.cyan(...params));
  },
  success: function (...params) {
    console.log(chalk.green(...params));
  },
  warning: function (...params) {
    console.log(chalk.yellow(...params));
  },
  error: function (...params) {
    console.log(chalk.red(...params));
  },
  table: function (data) {
    var table = new Table({});

    if (data.length > 0) {
      if (!_.isArray(data[0])) {
        table.push(Object.keys(data[0]));
      }
    }

    data.map(function (item){
      table.push(_.values(item));
    });
    console.log(table.toString());
  },
  chalkline: function (color) {
    if (color.length > 0) {
      try {
        eval(`cl.${color}()`); // eslint-disable-line
      }
      catch (e) {
        console.error(chalk.bgRed.bold(`Invalid Color: ${color}`));
      }
    }
  },
  dir: function (data) {
    console.dir(data);
  }
};

module.exports = messenger;
