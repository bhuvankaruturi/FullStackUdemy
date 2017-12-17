var name = prompt("Hey there! What is your name?");
$(document).ready(function(){
	var image = getElementByTagName('img');
	var count = 10;
	var fsize = 1;
	var strFSize = "";
	var h1Tag = document.getElementById("number");
	var interval = setInterval(function(){
		//h1Tag.style.display = (h1Tag.style.display == 'none' ? '' : 'none' );
		if (h1Tag.style.display != 'none'){
			fsize += 2 * count;
			strFSize = fsize + "px";
			h1Tag.style.fontSize = strFSize;
			h1Tag.innerHTML = count;
			h1Tag.style.borderColor = (h1Tag.style.borderColor == 'blue' ? 'brown' : 'blue');
			count--;
		}
		if (count < 0){
			number.style.color = 'brown';
			number.innerHTML = "Hello " + name + "!";
			clearInterval(interval);
			h1Tag.style.display = 'block';
		}
	}, 250);
	img.addListener
 }
);