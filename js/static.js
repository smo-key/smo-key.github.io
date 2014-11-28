var fs = require("fs"),
    s = require("string");
	vars = require("./vars.js");

function handle(response, uri) {
    //get just the file name
    var pagename = uri.replace(/^.*[\\\/]/, '');
    //get the static page
	var page = vars.getStaticPage(pagename);

	fs.exists(page, function(exists) {
		if(exists) {
			fs.readFile(page, function(err, file) {
				console.log("GET RESP: " + page);
				response.writeHead(404, {"Content-Type": "text/html", "Content-Length": file.length});
				response.write(file);
				response.end();
			});
		} else {
            if (!(s(pagename).contains("404.")))
            {
                console.log("ERR 404 from " + page);
                handle(response, uri, "404.html");
            }
            else
            {
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write("404 Error!");
                console.log("ERR 404: No 404 page found!");
                response.end();
            }
		}
	});
}
exports.handle = handle;
