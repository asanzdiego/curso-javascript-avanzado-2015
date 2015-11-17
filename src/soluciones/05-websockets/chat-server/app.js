var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

  console.log('Alguien se ha conectado con Sockets');
  io.sockets.emit('message', {
    author: "Servidor Socket.IO",
    text: "Bienvenido"
  });

  socket.on('new-message', function(data) {
    console.log(data);
    io.sockets.emit('message', data);
  });
});
