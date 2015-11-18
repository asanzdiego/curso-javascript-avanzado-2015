var express = require('express');

var app = express();
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function() {
  console.log('Express running on http://localhost:3000');
});
