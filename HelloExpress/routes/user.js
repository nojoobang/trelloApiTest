'use strict';

exports.list = function(req, res){
	var Config = require("../Config"),
		config = new Config(),
		oauth = config.oauth,

		url = require('url'),
		query = url.parse(req.url, true).query,
		token = query.oauth_token,
		tokenSecret = query.tokenSecret,
		verifier = query.oauth_verifier;
		
  	return oauth.getOAuthAccessToken(token, tokenSecret, verifier, function(error, accessToken, accessTokenSecret, results) {
		return oauth.getProtectedResource("https://api.trello.com/1/members/me", "GET", accessToken, accessTokenSecret, function(error, data, response) {
			return res.end(data);
		});
	});

};