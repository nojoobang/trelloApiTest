'use strict';

module.exports = function(req, res){
	var OAuth = require('oauth').OAuth,
		that = this;
	
	this.requestURL = "https://trello.com/1/OAuthGetRequestToken";
	this.accessURL = "https://trello.com/1/OAuthGetAccessToken";
	this.authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
	this.loginCallback = "http://127.0.0.1:3000/users";

	this.myKey = "bc2746ad21a253b505fa27438f1fa256";
	this.secret = "a8f1568bdffd24490dcb688d0410402fe01cd12cb366ff6d928e4aa790bc710f";
		//token = "588f337cb358e08704d6e0bce503021959d7cda897decc5c6f4e777433e4ddf7",
	this.oauth = new OAuth(this.requestURL, this.accessURL, this.myKey, this.secret, "1.0", this.loginCallback, "HMAC-SHA1");
	this.oauth_secrets = {};

	this.appName = "KnowReDev";
};