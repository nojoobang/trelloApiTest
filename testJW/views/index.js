var TrelloTable = function() {
	this.trello = Trello;

	this.boards = null;

	this._initialize();	
};

var _ = TrelloTable.prototype;

_._initialize = function() {
	this._makeBoardList();
	this._authorizing();
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


_._authorizing = function() {
	var that = this;

	this.trello.authorize({
	    interactive: false,
	    scope: { read: true, write: true, account: true },
	    expiration: "30days",
	    success: that._makeTd
	});
};

_._makeTd = function() {
	var that = this;

	for (var i = 0; i < 1; i++) {
		this.trello.boards.get(this.boards[i].id, function(boards) {
			console.log(boards)
		});		
	}
	
};

var t = new TrelloTable();