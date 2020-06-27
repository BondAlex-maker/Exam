const fs = require('fs');
const path = require('path');
const readline = require('readline');
const currentLogPath = path.join(__dirname, '..', '..', '..', '..', 'logs', 'logErrors.txt');
const logPath = path.join(__dirname, '..', '..', '..', '..', 'logs');


let lastFlushDate = new Date(0);

module.exports.log = (errToLog) => {

    let stream = fs.createWriteStream(currentLogPath, {flags:'a'}); //a === append
    stream.write(formatError(errToLog) + '\n');
    stream.end();

};

function formatError(err) {
    console.log(err.statusCode);
    return JSON.stringify({message: err.message, time: new Date().getTime(), code: err.code, stackTrace: err.stack});
}

module.exports.storeDayLogFile = () => {
    if (checkCurrentTime()) {
        let content = '';
        let lineReader = readline.createInterface({
            input: fs.createReadStream(currentLogPath)
        });
        let i = 1;
        lineReader.on('line', function (line) {
            let errObj = JSON.parse(line);
            content += JSON.stringify({message: errObj.message, code: errObj.code, time: errObj.time})  +'\n';
        });

        lineReader.on('close', function () {
            console.log(content);
            const logFileName = path.join(logPath, new Date().toISOString() + '.txt');
            fs.appendFile(logFileName, content, (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
            fs.truncate(currentLogPath, 0, function(){console.log('done')});
        });
    }
}

function checkCurrentTime() {
    let date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours == 0 && minutes == 0 && Math.floor((date.getTime() - lastFlushDate.getTime())/60000) > 2) {
        lastFlushDate = new Date();
        return true;
    }
    return false;
}