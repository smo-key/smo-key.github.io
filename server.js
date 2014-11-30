//instantiate variables
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    compressor = require("node-minify"),
    app = require("express"),
    sass = require("node-sass"),
    rmdir = require("rimraf"),
    vars = require("./js/vars.node.js"),
    s = require("string"),
    hekyll = require("hekyll");
    //router = require("./js/router.js");
//require only includes
require("prototypes");

//get server port
port = process.argv[2] || 8888;

hekyll.parse();
hekyll.include();

//Generate HTML pages
// TODO implement generation

//create server and router
http.createServer(function(request, response) {
    //GET JEKYLLED SITE
	app.get(vars.outputPath + "/", function (req, res) {
        console.log("GOT request at JEKYLL");
    });
    //GET CSS
	app.get(vars.outputPath + "css/", function (req, res) {
        console.log("GOT request at CSS");
    });
    //GET STATIC PAGES

}).listen(parseInt(port, 10));
console.log("SERVE: Server started on port " + port);
