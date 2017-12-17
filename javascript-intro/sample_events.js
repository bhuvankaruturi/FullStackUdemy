var buttonOne = document.getElementById('bt1');
var paragraph = document.querySelector('p');

buttonOne.addEventListener("click", function(){
	paragraph.textContent = "Some One has clicked the button";
});