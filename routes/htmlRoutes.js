// outside includes
const path = require("path");

// html redirects with api call
function htmlRoutes(app){
    // if notes, go to the notes page
    app.get("/notes", function (req, res){
        res.sendFile(path.join(__dirname, `../public${req.url.toLowerCase()}.html`));
    });

    // if it's index, go to the index
    app.get("/index", function(req, res){
        res.sendFile(path.join(__dirname, `../public${req.url.toLowerCase()}.html`));
    });

    // if it's anything else, go to the index
    app.get("*", function(req, res){
        //console.log(`${req.url} isn't a valid option, going to index`);
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    
    return;
}

module.exports = {
    htmlRoutes : htmlRoutes
};