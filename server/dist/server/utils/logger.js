"use strict";

var fs = require('fs');

var path = require('path');

var readline = require('readline');

var currentLogPath = path.join(__dirname, '..', '..', '..', '..', 'logs', 'logErrors.txt');
var logPath = path.join(__dirname, '..', '..', '..', '..', 'logs');
var lastFlushDate = new Date(0);

module.exports.log = function (errToLog) {
  var stream = fs.createWriteStream(currentLogPath, {
    flags: 'a'
  }); //a === append

  stream.write(formatError(errToLog) + '\n');
  stream.end();
};

function formatError(err) {
  console.log(err.statusCode);
  return JSON.stringify({
    message: err.message,
    time: new Date().getTime(),
    code: err.code,
    stackTrace: err.stack
  });
}

module.exports.storeDayLogFile = function () {
  if (checkCurrentTime()) {
    var content = '';
    var lineReader = readline.createInterface({
      input: fs.createReadStream(currentLogPath)
    });
    var i = 1;
    lineReader.on('line', function (line) {
      var errObj = JSON.parse(line);
      content += JSON.stringify({
        message: errObj.message,
        code: errObj.code,
        time: errObj.time
      }) + '\n';
    });
    lineReader.on('close', function () {
      console.log(content);
      var logFileName = path.join(logPath, new Date().toISOString() + '.txt');
      fs.appendFile(logFileName, content, function (err) {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
      fs.truncate(currentLogPath, 0, function () {
        console.log('done');
      });
    });
  }
};

function checkCurrentTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  if (hours == 0 && minutes == 0 && Math.floor((date.getTime() - lastFlushDate.getTime()) / 60000) > 2) {
    lastFlushDate = new Date();
    return true;
  }

  return false;
}