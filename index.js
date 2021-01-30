const express = require('express');

const app = express();
const server = require('http').Server(app).listen(3000);
const io = require('socket.io')(server);

app.use('/favicon.ico', express.static('favicon.ico'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

const connections = [];

io.sockets.on('connection', socket => {
  connections.push(socket);
  console.log(`User ${connections.indexOf(socket) + 1} connected`);

  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('User disconnected');
  });

  socket.on('send mess', data => {
    io.sockets.emit('add mess', { message: data.message, name: data.name, className: data.className });
  });
});
