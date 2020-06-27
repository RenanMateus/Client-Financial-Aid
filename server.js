const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.use(express.static('./public'));

http.listen(3701, function(){
    console.log('Servidor inicializado');
})