const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { port } = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/front'));
app.use('/', require('./server/routes'));

app.listen(port, console.log(`App started at http://localhost:${port}...`));