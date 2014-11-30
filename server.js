//instantiate variables
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    compressor = require("node-minify"),
    app = require("express"),
    sass = require("node-sass"),
    rmdir = require("rimraf"),
    vars = require("./js/vars.js"),
    s = require("string"),
    router = require("./js/router.js");
//require only includes
require("prototypes");

//get server port
port = process.argv[2] || 8888;

//prepare file system
rmdir.sync(vars.outputPath, function(error){ if(error) { throw(error); }});
fs.mkdirSync(vars.outputPath, function(error){ if(error) { throw(error); }});
fs.mkdirSync(vars.outputPath + "css", function(error){ if(error) { throw(error); }});

//generate css from sass
// TODO check if exists
fs.readdir("./" + vars.sassPath, function(err, files){
    if(err) throw err;
    files.forEach(function(file){
        //a main Sass file contains front matter (---)
        var filedir = vars.sassPath + file;
        if (vars.hasFrontMatter(filedir))
        {
            //remove the front matter if found to prevent error then read SASS
            fs.readFile(filedir, "utf8", function(error, data) {
                sass.renderFile({
                    data: data.substringFromLast("---"),
                    outFile: vars.outputPath + "css/" + s(file).replace(".sass", ".css"),
                    success: function(css) {
                        console.log("Parsed a file at " + file + "!");
                    },
                    error: function(error) {
                        throw(error);
                    },
                    includePaths: [ vars.sassPath ],
                    imagePath: vars.imagePath,
                    outputStyle: 'compressed'
                });
            });
        }
    });
});

//compress and copy css and js
// TODO implement compress anything with .css extension in css folder (that does not end with .min.css extension)
// TODO implement compress anything with .js extension in js folder (that does not end with .min.js extension)

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
console.log("Server started on port " + port);
