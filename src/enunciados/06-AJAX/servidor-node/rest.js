module.exports = function(app) {

    var availableTags = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme"
    ];

    var marcas = {
        1: [
            { id: "11", name: "C3" },
            { id: "12", name: "C4" },
            { id: "13", name: "C5" } ],
        2: [
            { id: "21", name: "Ibiza" },
            { id: "22", name: "Altea" } ,
            { id: "23", name: "Toledo" } ],
        3: [
            { id: "31", name: "208" },
            { id: "32", name: "308" },
            { id: "32", name: "508" } ]
    };

    var tags = function(req, res) {

        // modificar las cabeceras con CORS
        // res.header(...

        res.send(availableTags);
    }

    var marcaById = function(req, res) {

        // modificar las cabeceras con CORS
        // res.header(...

        // white for 1000 milliseconds
        var millis = 1000 + new Date().getTime();
        while(new Date() < millis);

        console.log("GET");
        console.log("req.param.id="+req.params.id);

        // devolver los modelos correspondientes al id pasado por parametro
        // ...
    }

    var progressBar = function(req, res) {

        // white for 1000 milliseconds
        var millis = 1000 + new Date().getTime();
        while(new Date() < millis);

        console.log("GET");
        console.log("req.params.time="+req.params.time);

        var time = req.params.time;

        var now = new Date().getTime();
        var delta = now - time;
        var percentage = Math.round(delta/100);

        console.log("percentage="+percentage);

        // devolver como jsonp
        // res.jsonp(...
    }

    app.get('/tags', tags);
    app.get('/marca/:id', marcaById);
    app.get('/progress/:time', progressBar);

}
