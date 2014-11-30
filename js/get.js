var fs = require("fs"),
    s = require("string"),
    mime = require("mime"),
	vars = require("./vars.js");

function handle(response, uri, filetype) {
    //get just the file name
    var filename = uri.replace(/^.*[\\\/]/, '');
    //get the file
    switch (filetype)
    {
        case exports.type.static:
            var page = vars.getStaticPage(filename); break;
        case exports.type.jekyll:
            var page = vars.getJekyllPage(filename); break;
        case exports.type.root:
            var page = vars.getRootPage(filename); break;
        default:
            var page = vars.getStaticPage("404.html"); break;
    }

	fs.exists(page, function(exists) {
        try {
            if(exists) {
                fs.readFile(page, function(err, file) {
                    try {
                    console.log("GET RESP: " + page);
                    response.writeHead(200, {"Content-Type": mime.lookup(filename), "Content-Length": file.length});
                    response.write(file);
                    response.end();
                    } catch (e) {
                        console.log("ERR 404: " + page);
                        handle(response, "404.html", exports.type.static);
                        return;
                    }
                });
            } else {
                if (!(s(filename).contains("404.")))
                {
                    throw new Error("ERR 404: " + page);
                }
                else
                {
                    response.writeHead(404, {"Content-Type": "text/plain"});
                    response.write("404 Error!");
                    console.log("ERR 404: No 404 page found!");
                    response.end();
                }
            }
        } catch (e) {
            console.log(e.message);
            handle(response, "404.html", exports.type.static);
            return;
        }
	});
}

exports.type = { static:0, root:1, jekyll:2 };
exports.typecount = 3;
exports.handle = handle;
