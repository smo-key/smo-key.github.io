//instantiate variables
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    compressor = require("node-minify"),
    hekyll = require("hekyll"),
    vars = require("./js/vars.js"),
    router = require("./js/router.js");

//get server port
port = process.argv[2] || 8888;

//Generate Heckle pages
console.log("Hekyll is generating pages...");
hekyll.generate();

//compress css and js
// TODO implement compression

//create server and router
http.createServer(function(request, response) {
	router.route(request, response);
}).listen(parseInt(port, 10));
console.log("Server started on port " + port);
