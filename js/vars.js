exports.mainPath = process.cwd();
exports.serverName = "Arthur Pachachura's Personal Website";
exports.debug = true;

exports.staticPagesPath = "/static/";
exports.getStaticPage = function(page) {
	return exports.mainPath + exports.staticPagesPath + page;
}
exports.jekyllPagesPath = "/_site/";
exports.getJekyllPage = function(page) {
	return exports.mainPath + exports.staticPagesPath + page;
}
exports.getRootPage = function(page) {
	return exports.mainPath + "/" + page;
}
