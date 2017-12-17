//Get Input from the user using prompt
//Wait for the document to be ready and then add the user name in <h1> 
var userName = prompt("What is your name?");
var dummy = setInterval(function(){
	if (document.readyState == "complete") {
		document.getElementById("name").innerHTML = "Hello " + userName;
		clearInterval(dummy);
	}
} , 100);

//using jQuery's $(document).ready() method to check if the file is ready
//Then use setInterval to blink the <h1> tag
//Actually need not check for document readiness again here, as it is already checked in above code. 
//It is just put to show the jQuery's way of checking for document readiness
$(document).ready(function(){
	var name = document.getElementById("name");
	var count = 0;
	var interval = setInterval(function(){
		if (count < 10){
		name.style.display = (name.style.display == 'none' ? '' : 'none' );
		console.log("count " + count);
		count++;
	}
	else{
		clearInterval(interval);
		console.log("interval cleared");
		name.style.display = 'block';
	}
	}, 500);
	//console.log("out of setInterval")
	//name.style.display = 'block';
});

//use document.querySelector("tag_name") to select a particular tag in the document.