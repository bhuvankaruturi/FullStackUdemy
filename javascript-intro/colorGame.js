var colorDivs = document.getElementsByClassName("square");
var answerPara = document.getElementById("answer");
var resultSpan = document.getElementById("result");
var headerDiv = document.getElementById("header");
var gameControlSpan = document.getElementById("gameControl");
var hardButton = document.getElementById("hard");
var easyButton = document.getElementById("easy");
var activeMode = hardButton;
var divNumber;
var answerColor;
var randomNumber;

var getRandomColor = function(){
	var red = Math.floor(Math.random() * 1000) % 256;
	var green = Math.floor(Math.random() * 1000) % 256;
	var blue = Math.floor(Math.random() * 1000) % 256;
	return "rgb(" + red + ", " + green + ", " + blue + ")";
};

var getStyleValue = function(element, prop){
	return window.getComputedStyle(element, null).getPropertyValue(prop);
};

var initGame = function(number) {
	resultSpan.textContent = "";
	gameControlSpan.textContent = "New Colors";
	headerDiv.style.backgroundColor = "blue";
	activeMode.style.backgroundColor = getStyleValue(headerDiv, "background-color");
	divNumber = number;
	randomNumber = (Math.floor(Math.random() * 10) % divNumber);
}
var eventHandlerForDiv = function(){
	if(this.style.backgroundColor == answerColor){
		resultSpan.textContent = "Correct!"
		headerDiv.style.backgroundColor = answerColor;
		for(var j = 0; j < divNumber; j++){
			colorDivs[j].style.backgroundColor = answerColor;
		}
		gameControlSpan.textContent = "Play Again?";
		activeMode.style.backgroundColor = getStyleValue(headerDiv, "background-color");
	} else {
		resultSpan.textContent = "Try Again!";
		this.style.backgroundColor = "#232323";
	}
};
var gameController = function(number){
	initGame(number);
	for(var i = 0; i < colorDivs.length; i++){
		if (i < divNumber){
			var randomColor = getRandomColor();
			//Set Random Colors to Color Divs
			if(i === randomNumber){
				answerColor = randomColor;
				answerPara.textContent = randomColor;
			}
			colorDivs[i].style.backgroundColor = randomColor; 

			//Add Events to Color Divs
			colorDivs[i].addEventListener('click', eventHandlerForDiv);
		} else {
			//If i is still less than colorDivs.length then set the remaining divs to black
			colorDivs[i].style.backgroundColor = "#232323";
			colorDivs[i].removeEventListener('click', eventHandlerForDiv);
		}
	}
};
//starting the game
gameController(6);

gameControlSpan.addEventListener('click', function(){
		gameController(divNumber);
		gameOver = false;
});

var setButtonColors = function(active){
	activeMode.style.backgroundColor = "white";
	activeMode = active;
	activeMode.style.backgroundColor = getStyleValue(headerDiv, "background-color");
}

easyButton.addEventListener('click', function(){
	setButtonColors(this);
	gameController(3);
});

hardButton.addEventListener('click', function(){
	setButtonColors(this);
	gameController(6);
});

