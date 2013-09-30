"use strict";

module.exports = function(oauth) {
	this.oauth = oauth;
	this.boards = [];
	this.data = null;
	// this.boardData = [];
	// this.cardData = [];

	this._initialize();
};

var _ = module.exports.prototype;

_._initialize = function() {
	this._makeBoardList();
};

_._makeBoardList = function() {
	this.boards = [{
		name: "contentUSTeam",
		id: "5215d0a6f110af2843001769"
	},
	{
		name: "customerFeedback",
		id: "522d9a338d6497660e005462"
	},
	{
		name: "devEngineering",
		id: "5215db861bbe57d35f001a2e"
	},
	{
		name: "devTeamCurrent",
		id: "5215d051af8084333d00160e"
	},
	{
		name: "finished",
		id: "5215d161caf0ab3857000d49"
	},
	{
		name: "meeting",
		id: "522e7f38f718ffa90e00e05c"
	},
	{
		name: "roadMap",
		id: "5215d1be14f5207c5f001526"
	},
	{
		name: "UXReception",
		id: "5232db25f507490a2b001bf5"
	},
	{
		name: "UXUSCurrnet",
		id: "5232de95bb3bbcc103001b11"
	}];
};

_.getCardData = function(accessToken, accessTokenSecret) {
	// var that = this,
	// 	accessToken = accessToken,
	// 	accessTokenSecret = accessTokenSecret;

	for (var i = 0; i < 1; i++){
		//console.log(this._makeCardData(i, accessToken, accessTokenSecret));
		//this.boards[i]['cards'] = this._makeCardData(i, accessToken, accessTokenSecret);
		this._getData(i);
	}
};

// _._makeCardData = function(i, accessToken, accessTokenSecret) {
// 	var that = this,
// 		host = 'https://api.trello.com',
// 		param = 'fields=idBoard,idList,idMembers,name,url',
// 		num = i,
// 		boards;

// 	this.oauth.getProtectedResource( host + "/1/boards/"+ this.boards[num].id + '/cards?' + param, "GET", accessToken, accessTokenSecret, function(error, data, response) {
// 		console.log(data);
// 		return data
// 	});
// };

_._getData = function(index) {
	var Trello = require("node-trello"),
		t = new Trello("bc2746ad21a253b505fa27438f1fa256", "588f337cb358e08704d6e0bce503021959d7cda897decc5c6f4e777433e4ddf7"),
		that = this,
		Data;

	t.get("/1/boards/"+ this.boards[index].id +"/cards?fields=idBoard,idList,idMembers,name,url", { name: "name"}, function(err, data) {
	  if (err) throw err;
	  //console.log(that.data);
	  that.data = data;
	  //console.log(that.data);
	  //console.log(data);
	  console.log(that.data);
	});

	//console.log(that.data);

};


// t.get("/1/boards/5215db861bbe57d35f001a2e/cards?fields=idBoard,idList,idMembers,name,url", function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });


// t.get("/1/cards/523c4fe243b4a4ef2c003a5b/", function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });

