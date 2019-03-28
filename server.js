let express = require('express');
let app = express();
let server = require('http').Server(app).listen(3000);
let io = require('socket.io').listen(server);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

let connections = [];

io.sockets.on('connection', (socket) => {
  connections.push(socket);
  console.info(`Пользователь ${connections.indexOf(socket) + 1} подключен`);

  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    console.info('Пользователь отключен');
  });

	socket.on('send mess', (data) => {
		io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
	});
});
