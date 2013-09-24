var Trello = require("node-trello");
var t = new Trello("bc2746ad21a253b505fa27438f1fa256", "588f337cb358e08704d6e0bce503021959d7cda897decc5c6f4e777433e4ddf7");

t.get("/1/boards/52413ab66cd3f92b770065fe/cards?fields=name", function(err, data) {
  if (err) throw err;
  console.log(data);
});

// URL arguments are passed in as an object.
// t.get("/1/members/me", { cards: "open" }, function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });