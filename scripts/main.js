(function(){

	function Layout(){};

	Layout.prototype.expandSkinsList = function(id){
		document.getElementById(id).classList.toggle("show");
	}

	window.onclick = function(e) {
	    if (!e.target.matches('.settings-buttons')) {
		    var skinsDropdown = document.getElementById("skin");
		    var difficultiesDropdown = document.getElementById("difficulty");
		    if (skinsDropdown.classList.contains('show') || difficultiesDropdown.classList.contains('show')) {
		        skinsDropdown.classList.remove('show');
		        difficultiesDropdown.classList.remove('show');
		    }
	    }
	}

	Layout.prototype.closeGreetingWindow = function() {
		document.getElementsByClassName("greeting-window")[0].classList.toggle("hide");
		this.setDefaultLayout();
		this.layOutCards("tom", "easy");
	}

	Layout.prototype.setDefaultLayout = function() {
		document.getElementsByClassName("game-field easy")[0].style.display='block'
		var cells = document.getElementsByClassName("game-field easy")[0].getElementsByClassName("cover");
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundImage = "url('images/easy/tom_option.jpg')";
		}
	}

	Layout.prototype.startNewGame = function(skin, level) {
		var currentSkin = skin || this.getCurrentSkin();
		var currentLevel = level || this.getCurrentLevel();
		var fields = document.getElementsByClassName("game-field");
		for (var i = 0; i < fields.length; i++) {
			if (fields[i].classList.contains(currentLevel)) {
				fields[i].style.display="block";
				this.setSkin(currentSkin);
			}
			else {
				fields[i].style.display="none";
			}
		}

		this.layOutCards(currentSkin, currentLevel);
		game = new Game();
	}

	Layout.prototype.setSkin = function(skin) {
		var currentLevel = this.getCurrentLevel();
		document.getElementsByClassName(currentLevel)[0].style.display='block'
		var cells = document.getElementsByClassName(currentLevel)[0].getElementsByClassName("cover");
		var newSkin = this.parsePathToImage(skin, currentLevel)  + "_option.jpg";
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundImage = 'url("'+newSkin+'")';
			cells[i].style.display = "block";
		}
	}

	Layout.prototype.applySkin = function(skin) {
		var currentLevel = this.getCurrentLevel();
		this.startNewGame(skin, currentLevel);
	}

	Layout.prototype.applyLevel = function(level) {
		var currentSkin = this.getCurrentSkin();
		this.startNewGame(currentSkin, level);
	}

	Layout.prototype.getCurrentSkin = function(){
		var currentLevel = this.getCurrentLevel();
		var imageURL = document.getElementsByClassName(currentLevel)[0].getElementsByClassName("cover")[0].style.backgroundImage;
		var urlParts = imageURL.slice(5, -2).split("/");
		return urlParts[urlParts.length - 1].split("_")[0];
	}

	Layout.prototype.getCurrentLevel = function(){
		var fields = document.getElementsByClassName('game-field');
		return [].filter.call(fields, item => item.style.display == "block")[0].classList[1];
	};

	Layout.prototype.parsePathToImage = function(imageName, level) {
		return "images/" + level + "/" + imageName;
	}

	Layout.prototype.layOutCards = function(skin, level) {
		const pics = {
		"1": "1.png",
		"2": "2.png",
		"3": "3.png",
		"4": "4.png",
		"5": "5.png",
		"6": "6.png",
		"7": "7.png",
		"8": "8.png",
		"9": "9.png",
		"10": "10.png",
		"11": "11.png",
		"12": "12.png",
		};
		var cells = document.getElementsByClassName(level)[0].getElementsByClassName("card");
		var positions = this.setCardsPositions(level);
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundImage = 'url("'+this.parsePathToImage(pics[positions[i]], level + '/' + skin)+'")';
		}
	}

	Layout.prototype.setCardsPositions = function(level) {
		var length, arr = [], pool = [];
		switch (level) {
			case "easy" :
				length = 10;
				break;
			case "medium" :
				length = 18;
				break;
			case "hard" :
				length = 24;
				break;
		}

		for (var i = 1, j = 1; i <= length; i+=2, j++) {
			arr[i-1] = j;
			arr[i] = j; 
		}

		for (var i = 1; i <= length; i++) {
			var value = arr.splice(Math.floor(Math.random() * ((length - i) - 1) + 1), 1);
			pool.push(value.pop());
		}

		return pool;
	}

	var layout = new Layout();

	document.addEventListener("DOMContentLoaded", function(event) { 
		var closeGreetWindBtn = document.getElementById("closeGreetWind");
		closeGreetWindBtn.addEventListener('click', function() {
			layout.closeGreetingWindow()
		} , false);	

		var changeSkinBtn = document.getElementById("changeSkin");
		changeSkinBtn.addEventListener('click', function() {
			layout.expandSkinsList('skin')
		} , false);	

		var changeDifficultyBtn = document.getElementById("changeDifficulty");
		changeDifficultyBtn.addEventListener('click', function() {
			layout.expandSkinsList('difficulty')
		} , false);	

		var tomBtn = document.getElementById("tom");
		tomBtn.addEventListener('click', function() {
			layout.applySkin('tom')
		} , false);	

		var jerryBtn = document.getElementById("jerry");
		jerryBtn.addEventListener('click', function() {
			layout.applySkin('jerry')
		} , false);	

		var spikeBtn = document.getElementById("spike");
		spikeBtn.addEventListener('click', function() {
			layout.applySkin('spike')
		} , false);	

		var easyBtn = document.getElementById("easy");
		easyBtn.addEventListener('click', function() {
			layout.applyLevel('easy')
		} , false);	

		var mediumBtn = document.getElementById("medium");
		mediumBtn.addEventListener('click', function() {
			layout.applyLevel('medium')
		} , false);	

		var hardBtn = document.getElementById("hard");
		hardBtn.addEventListener('click', function() {
			layout.applyLevel('hard')
		} , false);	

		var game;
	});
	
})();