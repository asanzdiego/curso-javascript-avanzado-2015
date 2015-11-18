module.exports = function(app) {

    var talks = [
        {name: "Talk 0", where: "Madrid"},
        {name: "Talk 1", where: "Barcelona"},
        {name: "Talk 2", where: "Valencia"}
    ]
    
    // GET - Return all talks in the DB
    var findTalks = function(req, res) {

        console.log('GET - findTalks');

        res.jsonp(talks);
    };

    // GET - Return a talk with specified ID
    var findTalk = function(req, res) {

        console.log('GET - findTalk');

        var talkId = req.params.talkId;
        console.log('talkId=' + talkId);

        // devolver talk con ese id
    };

    // POST - Insert a new talk in the DB
    var addTalk = function(req, res) {

        console.log('POST - addTalk');
        
        var talk = {
            name: "Talk "+talks.length,
            where: req.body.where
        };
        
        // añadir talk y devolver las talks
    };

    // PUT - Update a register already exists
    var updateTalk = function(req, res) {

        console.log('PUT - updateTalk');

        var talkId = req.params.talkId;
        console.log('talkId=' + talkId);

        var talk = {
            name: "Talk "+talkId,
            where: req.body.where
        };
        
        
        // actualizar talk con ese id y devolver las talks
    };

    // DELETE - Delete a talk with specified ID
    var deleteTalk = function(req, res) {

        console.log('DELETE - deleteTalk');

        var talkId = req.params.talkId;
        console.log('talkId=' + talkId);

        var talk = talks[talkId];
        
        // actualizar talk con ese id y devolver las talks
    };

    // Link routes and functions
    app.get(    '/talk',         findTalks);
    app.get(    '/talk/:talkId', findTalk);
    app.post(   '/talk',         addTalk);
    app.put(    '/talk/:talkId', updateTalk);
    app.delete( '/talk/:talkId', deleteTalk);
}