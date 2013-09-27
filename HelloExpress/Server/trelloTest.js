module.exports = function() {
		this.domain = "127.0.0.1";
		this.port = 6080;
		this.requestURL = "https://trello.com/1/OAuthGetRequestToken";
		this.accessURL = "https://trello.com/1/OAuthGetAccessToken";
		this.authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
		this.appName = "KnowReDev";
		this.key = "bc2746ad21a253b505fa27438f1fa256";
		this.secret = "a8f1568bdffd24490dcb688d0410402fe01cd12cb366ff6d928e4aa790bc710f";
		this.oauth_secrets = {};
		this.oauth = null;
		this.trelloData = null;

		this._initialize();
};

var _ = module.exports.prototype;

_._initialize = function() {
	var OAuth = require('oauth').OAuth,
		loginCallback = "http://" + this.domain + ":" + this.port + "/cb";
		this.oauth = new OAuth(this.requestURL, this.accessURL, this.key, this.secret, "1.0", loginCallback, "HMAC-SHA1");
};

_._login = function(req, res) {
	var that = this;

	return this.oauth.getOAuthRequestToken(function(error, token, tokenSecret, results) {
		that.oauth_secrets[token] = tokenSecret;
		res.writeHead(302, {
			'Location': "" + that.authorizeURL + "?oauth_token=" + token + "&name=" + that.appName
		});
		return res.end();
	});
};

_._cb = function(req, res) {
	var url = require('url'),
		TrelloData = require('../trelloData'),
		query = url.parse(req.url, true).query,
		token = query.oauth_token,
		tokenSecret = this.oauth_secrets[token],
		verifier = query.oauth_verifier,
		borads = null,
		that = this;


	this.trelloData = new TrelloData(this.oauth);

	this.oauth.getOAuthAccessToken(token, tokenSecret, verifier, function(error, accessToken, accessTokenSecret, results) {
		boards = that.trelloData.getCardData(accessToken, accessTokenSecret);
		//console.log(boards);
		res.end();
	});
};

_.start = function() {
	var http = require('http'),
		that = this;

	http.createServer(function(req, res) {
		if (/^\/login/.test(req.url)) {
			return that._login(req, res);
		} else if (/^\/cb/.test(req.url)) {
			return that._cb(req, res);
		} else {
			return res.end("Don't know about that");
		}
	}).listen(this.port, this.domain);

	console.log("Server running at " + this.domain + ":" + this.port + "; hit " + this.domain + ":" + this.port + "/login");
};

