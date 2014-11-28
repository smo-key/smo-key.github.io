var fs = require("fs"),
	vars = require("./vars.js");

function handle(code, response, uri, err, text) {
	var notfoundpage = vars.getStaticPage(code + ".html");
	console.log("ERR " + code + ": " + text + " at " + uri);
	fs.exists(notfoundpage, function(exists) {
		if(exists) {
			fs.readFile(notfoundpage, function(err, file) {
				response.writeHead(code, {"Content-Type": "text/html", "Content-Length": file.length});
				response.write(file);
				response.end();
			});
		} else {
			response.writeHead(code, {"Content-Type": "text/plain"});
			if(err) {
				response.write("Error: " + err);
				if(text) {
					response.write(text);
				}
			} else {
				if(text) {
					response.write(text);
				} else {
					response.write(code + " Error");
				}
			}
			response.end();
		}
	});
}

exports.handle = handle;
