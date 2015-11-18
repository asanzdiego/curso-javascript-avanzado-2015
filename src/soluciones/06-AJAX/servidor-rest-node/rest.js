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

        var talk = talks[talkId];
        res.jsonp(talk);
    };

    // POST - Insert a new talk in the DB
    var addTalk = function(req, res) {

        console.log('POST - addTalk');
        
        var talk = {
            name: "Talk "+talks.length,
            where: req.body.where
        };
        
        talks[talks.length] = talk;
        res.jsonp(talks);
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
        
        talks[talkId] = talk;
        res.jsonp(talks);
    };

    // DELETE - Delete a talk with specified ID
    var deleteTalk = function(req, res) {

        console.log('DELETE - deleteTalk');

        var talkId = req.params.talkId;
        console.log('talkId=' + talkId);

        var talk = talks[talkId];
        
        talks.splice(talkId, 1);
        res.jsonp(talks);
    };

    // Link routes and functions
    app.get(    '/talk',         findTalks);
    app.get(    '/talk/:talkId', findTalk);
    app.post(   '/talk',         addTalk);
    app.put(    '/talk/:talkId', updateTalk);
    app.delete( '/talk/:talkId', deleteTalk);
}