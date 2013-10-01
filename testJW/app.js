exports.index = function() {
	var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	http = require('http'),
	path = require('path'),
	app = express();

	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.engine('html', require('ejs').renderFile);

	app.use(app.router);
	app.use('/static', express.static(path.join(__dirname, '/public')));
	
	app.get('/', routes.index);
	app.get('/users', user.list);


	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
};

exports.index();