"use strict";

var Trello = require("node-trello"),
	myKey = "bc2746ad21a253b505fa27438f1fa256",
	secret = "a8f1568bdffd24490dcb688d0410402fe01cd12cb366ff6d928e4aa790bc710f",
	token = "588f337cb358e08704d6e0bce503021959d7cda897decc5c6f4e777433e4ddf7";

module.exports = function() {
	this.trello = new Trello(myKey, token);
	this.boards = [];
	// this.boardData = [];
	// this.cardData = [];

	this._initialize();
};

var _ = module.exports.prototype;

_._initialize = function() {
	this._makeBoardList();
	console.log(this.boards);
	this._getCardData();
	console.log(this.boards);
};

_._makeBoardList = function() {
	this.boards = [{
		name: "contentUSTeam",
		id: "5215d0a6f110af2843001769",
		cards: []
	},
	{
		name: "customerFeedback",
		id: "522d9a338d6497660e005462",
		cards: []
	},
	{
		name: "devEngineering",
		id: "5215db861bbe57d35f001a2e",
		cards: []
	},
	{
		name: "devTeamCurrent",
		id: "5215d051af8084333d00160e",
		cards: []
	},
	{
		name: "finished",
		id: "5215d161caf0ab3857000d49",
		cards: []
	},
	{
		name: "meeting",
		id: "522e7f38f718ffa90e00e05c",
		cards: []
	},
	{
		name: "roadMap",
		id: "5215d1be14f5207c5f001526",
		cards: []
	},
	{
		name: "UXReception",
		id: "5232db25f507490a2b001bf5",
		cards: []
	},
	{
		name: "UXUSCurrnet",
		id: "5232de95bb3bbcc103001b11",
		cards: []
	}];
}

_._getTrelloData = function(url) {
	this.trello.get(url, function(err, data) {
		if (err) throw err;
		return data;
	});
};

_._getCardData = function() {
	for (var i = 0; i < this.boards.length; i++){
		var url = "/1/boards/"+ this.boards[i].id +"/cards?fields=idBoard,idList,idMembers,name,url";
		//this.boards[i].cards = this._getTrelloData("/1/boards/"+ this.boards[i].id +"/cards?fields=idBoard,idList,idMembers,name,url");
		console.log(this._getTrelloData(url));
	}
};


// t.get("/1/boards/5215db861bbe57d35f001a2e/cards?fields=idBoard,idList,idMembers,name,url", function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });


// t.get("/1/cards/523c4fe243b4a4ef2c003a5b/", function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });

