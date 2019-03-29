function Game(user) {
	this.currentPlayer = user || "user",
	this.score = {
		"user" : 0,
		"computer" : 0
	}
	this.activeCard = null;
	this.interval;
}

Game.prototype.addCard = function(card) {
	//while (!card.isOpen()) {
		card.open();
	//}
	if (!this.activeCard) {
		this.activeCard = card;
	}
	else {
		this.disableCards();
		this.checkCardsMatch(card);
	}
}

Game.prototype.checkCardsMatch = function(card) {
	if (card.getPictureName() == this.activeCard.getPictureName()) {
		var that = this;
		setTimeout(function() {
			card.setEmpty();
			that.activeCard.setEmpty();
			that.activeCard = null;
			that.checkNoMoreTurns();
			if (that.currentPlayer == "computer") {
				that.playAsComputer();
			}
			else that.enableCards();
		}, 2000);
		this.score[this.currentPlayer] +=1;	
	}
	else {
		//if (card.isOpen() && this.activeCard.isOpen()) {
			var that = this;
			setTimeout(function() {
				that.activeCard.hide();
				card.hide();
				that.activeCard = null;
				that.checkNoMoreTurns();
				that.switchUser();
				//that.enableCards();
			}, 2000);
		//}
	}
	//this.enableCards();
}

Game.prototype.checkNoMoreTurns = function() {
	var currentLevel = this.getCurrentLevel();
	var images = document.getElementsByClassName(currentLevel)[0].getElementsByClassName("card");
	var emptyImages = [].filter.call(images, item => item.style.visibility == "hidden");
	if (images.length == emptyImages.length) {
		this.declareResults();
	}
}

Game.prototype.switchUser = function() {
	(this.currentPlayer == "user") ? this.currentPlayer = "computer" : this.currentPlayer = "user";
	if (this.currentPlayer == "computer") {
		var that = this;
		setTimeout(function() {
			that.disableCards();
			that.playAsComputer();
		}, 1000);
	}
	else this.enableCards();
}

Game.prototype.playAsComputer = function() {
	var cards = this.getRemainingCards();
	cards = this.shuffle(cards);
	var card1 = new Card(cards[0]);
	var card2 = new Card(cards[1]);
	this.addCard(card1);
	this.addCard(card2);
}

Game.prototype.getRemainingCards = function() {
	var indexes = [];
	var currentLevel = this.getCurrentLevel();
	var allCells = document.getElementsByClassName(currentLevel)[0].getElementsByClassName("divTableCell");
	var remainingCells = [].filter.call(allCells, item => item.getElementsByClassName("cover")[0].style.display != "none");
	for (var i = 0; i < remainingCells.length; i++) {
		indexes.push(remainingCells[i].getAttribute("data-i"));
	}
	return indexes;
}

Game.prototype.shuffle = function(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
  	while (0 !== currentIndex) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
  	}
  	return array;
}

Game.prototype.getWinner = function() {
	var usersScore = this.score["user"];
	var computerScore = this.score["computer"];
	return (usersScore > computerScore) ? "user" : 
			(usersScore < computerScore) ? "computer" : "draw";
}

Game.prototype.getCurrentLevel = function() {
	var fields = document.getElementsByClassName('game-field');
	return [].filter.call(fields, item => item.style.display == "block")[0].classList[1];
}

Game.prototype.declareResults = function() {
	var winner = this.getWinner();
	document.getElementsByClassName("game-over-window")[0].style.display = "block"
	var gameOverWindText = document.getElementById("game-over-text");
	var gameOverWindImg = document.getElementById("game-over-image");
	switch (winner) {
		case "user" :
			gameOverWindText.innerHTML = "You Win!";
			gameOverWindImg.src = "images/win.png";
			break;
		case "computer" :
			gameOverWindText.innerHTML = "Game Over!";
			gameOverWindImg.src = "images/fail.jpg";
			break;
		case "draw" :
			gameOverWindText.innerHTML = "Draw!";
			gameOverWindImg.src = "images/draw.jpg";
			break;
	}
	this.stopTimer();
}

Game.prototype.startTimer = function() {
	var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");

    var totalSeconds = 0;
    this.interval = setInterval(setTime, 1000);

    function setTime()
    {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds%60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
    }

    function pad(val)
    {
        var valString = val + "";
        if(valString.length < 2)
        {
            return "0" + valString;
        }
        else
        {
            return valString;
        }
    }
}

Game.prototype.stopTimer = function() {
	clearInterval(this.interval);
}

Game.prototype.disableCards = function() {
	var currentLevel = this.getCurrentLevel();
	var cards = document.getElementsByClassName(currentLevel)[0].getElementsByClassName("divTableCell");
	[].forEach.call(cards, item => item.classList.add("disable-cell"));
}

Game.prototype.enableCards = function() {
	var currentLevel = this.getCurrentLevel();
/*	var allCards = document.getElementsByClassName(currentLevel)[0].getElementsByClassName("divTableCell");
	var remainingCards = this.getRemainingCards();
	for (var i =  0; i < allCards.length; i++) {
		if (remainingCards) {}
	}*/
	var allCells = document.getElementsByClassName(currentLevel)[0].getElementsByClassName("divTableCell");
	var remainingCells = [].filter.call(allCells, item => item.getElementsByClassName("cover")[0].style.display != "none");
	[].forEach.call(remainingCells, item => item.classList.remove("disable-cell"));
			//cards.forEach(item => item.classList.remove("disable-cell"));
}

document.addEventListener("DOMContentLoaded", function(event) { 
	var cells = document.getElementsByClassName("divTableCell");
	[].forEach.call(cells, (function(element) {
		element.addEventListener('click', function() {
			var index = this.getAttribute("data-i")
			var card = new Card(index);
			//card.open()
		} , false);	
	}));
});