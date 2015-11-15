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

  var message = {
    author: "Servidor Socket.IO",
    text: "Bienvenido"
  }

  // enviar mensaje de bienvenida
  // io.sockets.emit('message'...

  socket.on('new-message', function(newMessage) {

    console.log(newMessage);

    // hacer un broadcast del nuevo mensaje
    // io.sockets.emit('message'...
  });
});
