var express = require('express');
var expressHbs = require('express-handlebars');

var app = express();
app.engine('hbs', expressHbs({ extname: 'hbs', defaultLayout: 'default' }));
app.set('view engine', 'hbs');
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(3000, function() {
  console.log('Express running on http://localhost:3000');
});
