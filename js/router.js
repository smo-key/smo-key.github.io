var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    s = require("string"),
    static = require("./static.js"),
    vars = require("./vars.js");

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function route(request, response) {
	var uri = url.parse(request.url).pathname;
	var filepath = path.join(vars.mainPath, uri);
	var cache = [];

	console.log(request.method + " INIT: " + uri);
	if(uri.indexOf("../") != -1) {
		console.log("ERR 403: Tree-walking attack attempted at " + uri);
		errHandler.errorCode(403, response, uri, null, "My tree will not be walked upon.");
		return;
	}
	if(request.method == "GET") {
        var uritrim = s(uri).chompRight(".html").chompLeft("/").s;
        switch(uritrim)
        {
            case "":
            case "index":
                //Index page
                static.handle(response, "index.html"); break;
            default:
                //check if file exists
                fs.exists(filepath, function(exists) {
                    if(exists) {
                        fs.readFile(filepath, function(err, file) {
                            if(err) {
                                console.log("ERR recieving file: " + err);
                                return;
                            }
                            response.writeHead(200, {"Content-Type": "image/x-icon", "Content-Length": file.length});
                            response.write(file, "binary");
                            response.end();
                        });
                    } else {
                        console.log("ERR 404: " + uri);
                        static.handle(response, "404.html");
                    }
                });
        }
	} else {
        console.log(request.method + ": Illegal request at " + uri);
		response.writeHead(405, {"Content-Type:": "text/plain"});
		response.write("Illegal request.");
		response.end();
	}
}

exports.route = route;
