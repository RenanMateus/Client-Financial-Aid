const express = require('express');
const app = express();
const http = require('http').createServer(app);
//const io = require('socket.io')(http);



// const app = express();
// const vhost = require('vhost');
// app.get(vhost('airshuttle.*', express.static('../client/public')))
app.use(express.static('./public'));
/*
io.on('connection', (socket) =>{
    console.log('Nova conexão' + socket.id)
    socket.on('online', (msg)=>{
        socket.broadcast.emit('online', msg);
    })
    socket.on('msg', (msg)=>{
        
        socket.broadcast.emit('msg', msg);
    })
    socket.on('notify', (msg)=>{
        console.log(msg);
        socket.broadcast.emit('notify', msg);
    })
})
*/
http.listen(3701, function(){
    console.log('Servidor inicializado');
})