var TrelloTable = function() {
	this.trello = Trello;

	this.boards = null;
	this.cards = [];
	this.idList = [];

	this._initialize();	
};

var _ = TrelloTable.prototype;

_._initialize = function() {
	this._bindEvent();
	this._makeBoardList();
	this._authorizing();
};

_._bindEvent = function() {
	var that = this;

	$('#auth').click(function(){
		that._authorizing();
	});

	$('#create').click(function(){
		that._makeCards();
	});
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
		type: "popup"
	});
};

_._makeCards = function() {
	var that = this;

	for (var i = 0; i < this.boards.length; i++) {	
		this._getCardData(i, "boards", this.boards[i].id);
	}
	console.log(this.cards);
};

_._makeStatus = function() {
	for (var j = 0; j < this.cards.length; j++ ) {
		this._getStatusData(j, "list", this.cards[j].idList);
	}
	console.log(this.idList);
};

_._makeTd = function() {
	var that = this;
	$('tbody').empty();

	
	for (var k = 0; k < this.cards.length; k++) {
		var str = "<tr>" + 
				  "<td class='issueName'>"+ this.cards[k].name +"</td>" +
				  "<td class='date'>mm/dd/yy</td>" +
				  "<td class='source'>KnowRe</td>" +
				  "<td class='contact'></td>" +
				  "<td class='type'></td>" +
				  "<td class='team'>"+  +"</td>" +
				  "<td class='trelloLink'>"+  +"</td>" +
				  "<td class='status'>"+ this.idList[k] +"</td>" +
				  "</tr>";
		$('tbody').append(str);
	}

};

_._getCardData = function(index, path, param) {
	var that = this;
	this.trello.get(path +"/"+ param +"/"+ "cards?attachment_fildes=date&fields=idBoard,idList,idMembers,name,url", function(data) {
		that.cards.push(data);	
	});	
};

_._getStatusData = function(index, path, param) {
	var that = this;

	this.trello.get(path +"/"+ param +"/"+ "name?", function(data) {
		that.idList.push(data);
	});	
	
};

var t = new TrelloTable();