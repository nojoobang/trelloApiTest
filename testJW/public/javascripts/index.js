var TrelloTable = function() {
	this.trello = Trello;

	this.boards = null;
	this.idList = [];

	this._initialize();	
};

var _ = TrelloTable.prototype;

_._initialize = function() {
	this._bindEvent();
	this._makeBoardList();
	this.trello.authorize({
		type: "redirect",
		name: "KnowReDev",
		interactive: false,
		scope: { read: true, write: true, account: true },
		success: this._makeCards()
	});
};

_._bindEvent = function() {
	var that = this;

	$('#auth').click(function(){
		that.trello.authorize({
			type: "redirect",
			name: "KnowReDev",
			interactive: false,
			scope: { read: true, write: true, account: true },
			success: that._makeCards()
		});
	});

	$('#create').click(function(){
		that._makeStatus();
		that._makeMember();
		that._makeLabel();
	});

	$('#makeTd').click(function(){
		that._makeTd();
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

_._makeCards = function() {
	var that = this;

	for (var i = 0; i < this.boards.length; i++) {	
		this._getCardData(i, "boards", this.boards[i].id);
	}
};

_._makeStatus = function() {
	for (var j = 0; j < this.boards.length; j++ ) {
		for (var k = 0; k < this.boards[j].cards.length; k++ ){
			this._getStatusData(j, k, "list", this.boards[j].cards[k].idList);
		}
	}
	console.log(this.boards);	
};

_._makeMember = function() {
	for (var i = 0; i < this.boards.length; i++ ) {
		for (var j = 0; j < this.boards[i].cards.length; j++ ){
			this.boards[i].cards[j]['memberContact'] = "";
			for (var k = 0; k < this.boards[i].cards[j].idMembers.length; k++) {
				this._getMemberData(i, j, k, "members", this.boards[i].cards[j].idMembers[k]);
			}
		}
	}
};

_._makeLabel = function() {
	for (var i = 0; i < this.boards.length; i++ ) {
		for (var j = 0; j < this.boards[i].cards.length; j++ ){
			this.boards[i].cards[j]['labelNames'] = "";
			for (var k = 0; k < this.boards[i].cards[j].labels.length; k++) {
				this.boards[i].cards[j]['labelNames'] += this.boards[i].cards[j].labels[k].color + " ";
			}
		}
	}
};

_._makeTd = function() {
	var that = this;
	$('tbody').empty();

	for(var i = 0; i < this.boards.length; i++) {
		for (var j = 0; j < this.boards[i].cards.length; j++) {
			//this._getStatusData(i, j, "list", this.boards[i].cards[j].idList);
			var type = ( this.boards[i].cards[j].name.match(/\[\w*\]/) ) ? this.boards[i].cards[j].name.match(/\[\w*\]/) : "??"
			var source = (this.boards[i].name == "customerFeedback") ? "Feedback" : "KnowRe";
			var str = "<tr>" + 
					  "<td class='boradName'>"+ this.boards[i].name +"</td>" +
					  "<td class='status'>"+ this.boards[i].cards[j].status +"</td>" +
					  "<td class='issueName'>"+ this.boards[i].cards[j].name +"</td>" +
					  "<td class='date'>"+ this.boards[i].cards[j].dateLastActivity.match(/[\d]{4}\-[\d]{1,2}\-[\d]{1,2}/) +"</td>" +
					  "<td class='source'>"+ source +"</td>" +
					  "<td class='contact'>"+this.boards[i].cards[j].memberContact+"</td>" +
					  "<td class='type'>"+ type +"</td>" +
					  "<td class='trelloLink'>"+ this.boards[i].cards[j].shortUrl +"</td>" +
					  "<td class='labels " + this.boards[i].cards[j].labelNames + "'>"+ this.boards[i].cards[j].labelNames +"</td>" +
					  "</tr>";
			$('tbody').append(str);
		}
	}


};

_._getCardData = function(index, path, param) {
	var that = this;

	this.trello.get(path +"/"+ param +"/"+ "cards?", function(data) {
		that.boards[index]['cards'] = data;
	});	
};

_._getStatusData = function(bIdx, cIdx, path, param) {
	var that = this;

	this.trello.get(path +"/"+ param +"/", function(data) {
		that.boards[bIdx].cards[cIdx]['status'] = data.name;
	});	
};

_._getMemberData = function(bIdx, cIdx, mIdx, path, param) {
	var that = this;

	this.trello.get(path +"/"+ param +"/", function(data) {
		that.boards[bIdx].cards[cIdx]['memberContact'] += "'" + data.fullName + "'&nbsp;";	
	});	
};

var t = new TrelloTable();