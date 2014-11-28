var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    s = require("string"),
    vars = require("./vars.js"),
    get = require("./get.js");

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
                get.handle(response, "index.html", get.type.jekyll); break;
            case "favicon.ico":
                get.handle(response, "favicon.ico", get.type.root); break;
            default:
                get.handle(response, uri, get.type.jekyll);
                break;
        }

	} else {
        console.log(request.method + ": Illegal request at " + uri);
		response.writeHead(405, {"Content-Type:": "text/plain"});
		response.write("Illegal request.");
		response.end();
	}
}

exports.route = route;
