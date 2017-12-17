var buttonPlayerOne = document.getElementById("btnpl1");
var buttonPlayerTwo = document.getElementById("btnpl2");
var resetButton = document.getElementById("reset");
var spanPlayerOne = document.getElementById("p1");
var spanPlayerTwo = document.getElementById("p2");
var textArea = document.getElementById("userSets");
var scorePlayerOne = 0;
var scorePlayerTwo = 0;
var numberOfSets = 5;
var gameOver = false;
var initGame = function(completeReset){
	scorePlayerOne = 0;
	scorePlayerTwo = 0;
	gameOver = false;
	spanPlayerOne.textContent = "0";
	spanPlayerOne.classList.remove("won");
	spanPlayerTwo.textContent = "0";
	spanPlayerTwo.classList.remove("won");
	if(completeReset){
		textArea.value = "";
	}
};

var setScores = function(currentScore, scoreCard){
	if(!gameOver){
		currentScore++;
		if(currentScore === numberOfSets){
			scoreCard.classList.add("won");
			gameOver = true;
		}
		scoreCard.textContent = currentScore;
		return currentScore;
	}
}

buttonPlayerOne.addEventListener("click",function(){
	scorePlayerOne = setScores(scorePlayerOne, spanPlayerOne);
});

buttonPlayerTwo.addEventListener("click",function(){
	scorePlayerTwo = setScores(scorePlayerTwo, spanPlayerTwo);
}); 

resetButton.addEventListener("click", function(){
	initGame(true);
});

textArea.addEventListener("change",function(){
	if(isNaN(this.value) || this.value == 0){
		alert("Please enter a valid number");
	}
	else {
		numberOfSets = parseInt(this.value);
		document.getElementById("sets").textContent = this.value;
		initGame(false); 
	}
})