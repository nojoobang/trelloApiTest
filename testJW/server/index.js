module.exports = function() {
	
}

var _ = module.exports.prototype;

_.readyExpress = function() {
	var express = require('express'),
	routes = require('../routes'),
	user = require('../routes/user'),
	http = require('http'),
	path = require('path'),
	app = express();

	app.set('port', process.env.PORT || 3000);
	app.set('views', '../views');
	app.engine('html', require('ejs').renderFile);

	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	
	app.get('/', routes.index);
	app.get('/users', user.list);


	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
};