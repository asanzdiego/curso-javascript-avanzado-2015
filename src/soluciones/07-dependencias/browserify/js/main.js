var $ = require('jquery');
var persona = require('./persona');

$('h1').html('Hola Browserify');

var p = new persona("Adolfo", 30);
p.saludar();
