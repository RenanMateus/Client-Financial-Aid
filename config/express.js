const express = require('express');
const app = express();
const vhost = require('vhost');
app.use(express.static('./public'));
app.get(vhost('airshuttle.*', express.static('../client/public')))

module.exports = app;