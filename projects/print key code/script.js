document.addEventListener('keydown', function(e){
	document.querySelector('h1').innerHTML = e.key + " &rarr; " + e.keyCode;
});