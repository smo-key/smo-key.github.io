var fs = require("fs");

exports.mainPath = process.cwd();
exports.serverName = "Arthur Pachachura's Personal Website";
exports.debug = true;

//inputs
// TODO make sure not path starts with "/"
exports.staticPath = "/static/";
exports.sassPath = "css/";
exports.cssPath = "css/"
exports.jsPath = "js/";
exports.imagePath = "/img/";

//rendered files
exports.outputPath = "_site/";

exports.getPage = function(page, path) {
	return exports.mainPath + exports.staticPagesPath + page;
}
exports.getFileName = function(path) {
    return path.replace(/^.*[\\\/]/, '');
}

//Templating checks
exports.hasFrontMatter = function(file) {
    var fd = fs.openSync(file, "r");
    var b = new Buffer(4);
    var ret = fs.readSync(fd, b, 0, 4, 0) == 4;
    ret = ret && (b.toString() == "---\n" || b.toString() == "---\r");
    fs.closeSync(fd);
    return ret;
}
