'use strict';

exports.index = function(req, res){
	var	Config = require("../Config"),
		config = new Config(),
		oauth = config.oauth;

	return oauth.getOAuthRequestToken(function(error, token, tokenSecret, results) {
		res.writeHead(302, {
			'Location': "" + config.authorizeURL + "?oauth_token=" + token + "&name=" + config.appName
		});
		return res.end();
 	});
};