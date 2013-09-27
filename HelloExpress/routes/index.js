'use strict';

exports.index = function(req, res){
	var	Config = require("../Config"),
		config = new Config(),
		oauth = config.oauth,
		that = this;

	return oauth.getOAuthRequestToken(function(error, token, tokenSecret, results) {
		config.oauth_secrets[token] = tokenSecret;
		res.writeHead(302, {
			'Location': "" + config.authorizeURL + "?oauth_token=" + token + "&name=" + config.appName
		});
		return res.end();
 	});
};