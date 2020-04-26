const fs = require('fs');
var path = require('path');

module.exports.log = (errToLog) => {
    var logPath = path.join(__dirname, '..', '..', '..','..', 'logs', 'logErrors.json');
    fs.open(logPath, 'w', (err, fd) => {
        if (err) throw err;

        fs.appendFile(fd, formatError(errToLog), (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });

        fs.close(fd, (err) => {
            if (err) throw err;
        });
    });
};

function formatError(err) {
    console.log(err.statusCode);
    return JSON.stringify({message: err.message, time: new Date().getTime(), code: err.code, stackTrace: err.stack});
}