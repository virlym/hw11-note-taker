// outside includes
const fs = require("fs");

// Note class to maintain structure

class Note{
    constructor(id, title, text){
        this.id = id;
        this.title = title;
        this.text = text;
    }
}

// handle api calls to the server
function apiRoutes(app) {

    const dbJsonData = JSON.parse(fs.readFileSync("./db/db.json","utf8"));

    // view all notes
    app.get("/api/notes", function(req, res) {
        res.json(dbJsonData);
    });

    // push a note into the stored notes
    app.post("/api/notes", function(req,res) {
        const newNote = new Note(dbJsonData.length, req.body.title, req.body.text);
        dbJsonData.push(newNote);
        writeToJson(dbJsonData);
        res.json(newNote);
    });

    // view notes by id
    app.get("/api/notes/:id", function(req,res) {
        res.json(dbJsonData[req.params.id]);
    });

    // delete note of selected id
    app.delete("/api/notes/:id", function(req,res) {
        for (let i = 0; i < dbJsonData.length; i++) {
            if (dbJsonData[i].id === parseInt(req.params.id)) {
                dbJsonData.splice(i,1);
                res.send(dbJsonData[i]);
                break;
            }
        }
        writeToJson(dbJsonData);
    });
}

// save note array to the json file
function writeToJson (data){
    fs.writeFileSync("./db/db.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return console.log(err);
        }
    })
};

module.exports = {
    apiRoutes : apiRoutes
};