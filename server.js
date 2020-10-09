// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var apiRoutes = require("./routes/apiRoutes.js");
var htmlRoutes = require("./routes/htmlRoutes.js");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Create an "express" server for node
var app = express();

// Utilize external files in the 'public' for the html
app.use(express.static("public"))

// Sets an initial port. We"ll use this later in our listener
// process.env.PORT for Heroku, or 8080 for dev
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle json data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

apiRoutes.apiRoutes(app);
htmlRoutes.htmlRoutes(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});