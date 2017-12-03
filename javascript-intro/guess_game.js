var num = 7;

var picked = false;
var userPick = prompt("Guess a number in range of 1 to 20 & enter below");
while (!picked){
	if (userPick == null){
		// When the user clicks cancel, abort the loop
		break;
	}
	if (isNaN(userPick)){
		alert("Nah Nah! You must only enter numbers");
		userPick = prompt("Again! Guess a number");
	}
	else{
		if (Number(userPick) > num){
			userPick = prompt("Too High! Guess again!");
		}
		else if(Number(userPick) < num){
			userPick = prompt("Too Low! Guess again!");
		}
		else{
			alert("Yahoo! You picked the right number");
			picked = true;
		}
	}
}

//Code for "Are we There Yet game"
//This is important-code.. ""DO	REFER IT WHEN OPERATING ON STRINGS""
/*var userInput = prompt("Are we there yet ?");

while (true){
	userInput = userInput.toLowerCase();
	if (userInput.indexOf("yes") !== -1 || userInput.indexOf("yeah") !== -1){
		alert("Yay!We have finally reached it");
		break;
	}
	else{
		userInput = prompt("Are we there yet");
	}
}*/

//function to replace all the "-" in a string to "_". Just for reference purpose;
function kebabToSnake(str) {
	var i = str.indexOf("-");
	while(i !== -1) {
		str = str.slice(0,i) + "_" + str.slice(i+1); // or use ==> str = str.replace("-","_");
		i = str.indexOf("-");						// OR use str.replace(/-/g, "_") to replace all occurences of "-" . Here /g is global (regex expression)
	}												// if you use str.replace(/-/g, "_"), then you need not use loop
	return str;
}