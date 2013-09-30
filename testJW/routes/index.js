exports.index = function(req, res){
	// var fs = require('fs');

	// fs.readFile('../views/index.html', 'utf8', function(error, data) {
	// 	res.writeHead(200, {'Content-Type': 'text/html'});
	// 	res.end(data);
	// });

	res.render('index.html');///
};