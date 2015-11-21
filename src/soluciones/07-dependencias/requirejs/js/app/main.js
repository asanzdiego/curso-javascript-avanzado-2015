define(function (require) {
    var $ = require('jquery');
    var persona = require('./persona');

    $('h1').html("Hola requery.js");

    var p = new persona("Adolfo", 30);
    p.saludar();
});
