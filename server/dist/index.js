"use strict";

require('./server/dbMongo/mongoose');

var http = require('http');

var express = require('express');

var router = require('./server/router');

var cors = require('cors');

var controller = require('./socketInit');

var handlerError = require('./server/handlerError/handler');

var logger = require('./server/utils/logger');

var PORT = process.env.PORT || 9632;
var app = express();
app.use(cors());
app.use(express.json());
app.use('/public', express["static"]('public'));
app.use(router);
app.use(handlerError);
setInterval(logger.storeDayLogFile, 5000);
var server = http.createServer(app);
server.listen(PORT
/*,
() => console.log(`Example app listening on port ${ PORT }!`)*/
);
controller.createConnection(server);