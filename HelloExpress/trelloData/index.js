"use strict";

module.exports = function(oauth) {
	this.oauth = oauth;
	this.boards = [];
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
	var that = this,
		accessToken = accessToken,
		accessTokenSecret = accessTokenSecret;

	for (var i = 0; i < this.boards.length; i++){
		this._makeCardData(i, accessToken, accessTokenSecret);
	}
	return this.boards;
};

_._makeCardData = function(i, accessToken, accessTokenSecret) {
	var that = this,
		host = 'https://api.trello.com',
		param = 'fields=idBoard,idList,idMembers,name,url',
		num = i;

	this.oauth.getProtectedResource( host + "/1/boards/"+ this.boards[num].id + '/cards?' + param, "GET", accessToken, accessTokenSecret, function(error, data, response) {
		//console.log(that.boards[num]);
		that.boards[num]["cards"] = data;
	});
};


// t.get("/1/boards/5215db861bbe57d35f001a2e/cards?fields=idBoard,idList,idMembers,name,url", function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });


// t.get("/1/cards/523c4fe243b4a4ef2c003a5b/", function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });

