var Trello = require("node-trello");
var t = new Trello("bc2746ad21a253b505fa27438f1fa256", "588f337cb358e08704d6e0bce503021959d7cda897decc5c6f4e777433e4ddf7");

// t.get("/1/boards/5215db861bbe57d35f001a2e/cards?fields=idBoard,idList,idMembers,name,url", function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });

// idList가 column이다.

// URL arguments are passed in as an object.
// t.get("/1/members/me", { cards: "open" }, function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });


t.get("/1/boards/5215db861bbe57d35f001a2e/cards?fields=idBoard,idList,idMembers,name,url", { cards: ""}, function(err, data) {
  if (err) throw err;
  console.log(data);
});

// t.get("/1/cards/523c4fe243b4a4ef2c003a5b/", function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });


// var express = require('express'),
// 	app = express();

// app.get('/', function(req, res) {
// 	res.send('Hello World');
// });

// app.listen(3303, function() {
// 	console.log('Server Start');
// });