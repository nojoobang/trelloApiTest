'use strict';

// exports.index = function() {
// 	var cluster = require('cluster'),
// 		numCPUs = require('os').cpus().length,
// 		Server = require('./Server'),
// 		fs = require('fs');

// 	exports.bootstrap(function() {});
	
// };

// exports.bootstrap = function(callback) {
// 	var Server = require('./Server'),
// 		server = new Server();

// 	server.start(function() {
// 		exports.server = server;
// 		callback();
// 	});
// };

// if(!module.parent) {
//     exports.index();
// }



exports.index = function() {
	var cluster = require('cluster'),
		numCPUs = require('os').cpus().length,
		Server = require('./Server'),
		fs = require('fs');

	exports.bootstrap();
	
};

exports.bootstrap = function() {
	var Server = require('./Server/trelloTest'),
		server = new Server();

	server.start();
};

if(!module.parent) {
    exports.index();
}