var startDate,decadeStart;
var endDate,decadeEnd;
var currentTime;
var percentage;
var loadText;
var intervalId;

var handleClick = function(event){
	clearInterval(intervalId);
	intervalId = setInterval(function(){
		currentTime = new Date();
		switch(event.target.id){
			case 'selectYear':
			  startDate = new Date(currentTime.getFullYear(), 0, 1);
			  endDate = new Date(currentTime.getFullYear(), 11, 32);
			  percentage = ((currentTime - startDate)/(endDate - startDate))*100;
			  loadText = currentTime.getFullYear()+1;
			  percentage = percentage.toFixed(6);
			  document.getElementById('currentDateText').innerHTML = "It's currently " + currentTime.toDateString();
			  document.getElementById('loadingText').innerHTML = "Loading " + loadText + "...";
			  document.getElementById('loadingBar').innerHTML = percentage + "%";
			  document.getElementById('progressBar').style.visibility = "visible";
			  document.getElementById('progressBar').setAttribute("value", percentage);
			  //document.body.style.background = "url('2016_happy_new_year-1366x768.jpg') no-repeat right top";
			  break;
			case 'selectDecade':
			  decadeStart = currentTime.getFullYear() - (currentTime.getFullYear()%10);
			  decadeEnd = decadeStart+9;
			  startDate = new Date(decadeStart, 0, 1);
			  endDate = new Date(decadeEnd, 11, 32);
			  percentage = ((currentTime - startDate)/(endDate - startDate))*100;
			  loadText = currentTime.getFullYear();
			  percentage = percentage.toFixed(6);
			  decadeEnd+=1;
			  document.getElementById('currentDateText').innerHTML = "It's currently " + loadText;
			  document.getElementById('loadingText').innerHTML = "Loading " + decadeEnd + "s...";
			  document.getElementById('loadingBar').innerHTML = percentage + "%";
			  document.getElementById('progressBar').style.visibility = "visible";
			  document.getElementById('progressBar').setAttribute("value", percentage);
			  //document.body.style.background = "url('decade-2010s.png') no-repeat right top";
			  break;
			default:
			  document.getElementById('currentDateText').innerHTML = "Current Date goes here";
			  document.getElementById('loadingText').innerHTML = "Loading text goes here";
			  document.getElementById('loadingBar').innerHTML = "Percentage goes here";
		}
	}, 200);	
}

document.querySelector("#selectYear").addEventListener('click', handleClick);
document.querySelector("#selectDecade").addEventListener('click', handleClick);
