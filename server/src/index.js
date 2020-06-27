require('./server/dbMongo/mongoose');
const http = require('http');
const express = require('express');
const router = require('./server/router');
const cors = require('cors');
const controller = require('./socketInit');
const handlerError = require('./server/handlerError/handler');
const logger = require('./server/utils/logger');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 9632;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);


app.use(handlerError);

 setInterval(logger.storeDayLogFile, 5000);

const server = http.createServer(app);
server.listen(PORT/*,
  () => console.log(`Example app listening on port ${ PORT }!`)*/);
controller.createConnection(server);


