'use strict';

module.exports = function() {
	this.server = null;
	this.httpApp = null;

	this.startCallback = null;
};

var _ = module.exports.prototype;


_.start = function(callback) {
	this.startCallback = callback;
//	this._initHTTPApp();
	this._initHTTPApp();
};


_._initHTTPApp = function() {
	var that = this,
		express = require('express'),
		path = require('path'),
		app = this.httpApp = express(),
		server,
		routes = require('../routes'),
		user = require('../routes/user');
	  	

	//global.server = this;
	global.app = app;


	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	app.get('/', routes.index);
	app.get('/users', user.list);

	that._startServer();	
};

_._startServer = function() {
	var that = this,
		http = require('http'),
		app = this.httpApp;
		
	this.server = http.createServer(app);
	this.server.listen(3000);
	this.startCallback();
};
