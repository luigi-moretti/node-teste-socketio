// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
        origin: "*",    
        methods: ["GET", "POST"]  
    }
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

let contador = 0;

io.on('connection', (socket) => {
    console.log('a user connected');  socket.on('disconnect', () => {    console.log('user disconnected');  });

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });


  
});

setInterval(()=>{
    contador ++;
    io.emit('notificacoes', {exibe: true, texto: `Essa é uma notificação de número ${contador}`})
}, 10000)

httpServer.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});