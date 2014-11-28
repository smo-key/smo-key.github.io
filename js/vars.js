exports.mainPath = process.cwd();
exports.serverName = "Arthur Pachachura's Personal Website";
exports.staticPagesPath = "/static/";
exports.getStaticPage = function(page) {
	return exports.mainPath + exports.staticPagesPath + page;
}
exports.debug = true;
