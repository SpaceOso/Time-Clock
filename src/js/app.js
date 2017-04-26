import * as Task from "./modules/task";
import * as Message from "./modules/messages";

import "../styles/styles.scss";

let startRadios = document.getElementsByName("start-time-frame");
let endRadios = document.getElementsByName("end-time-frame");

let radioButtons = document.querySelectorAll("input[type='radio']");

// let amStartColor = [255, 219, 151];
// let amEndColor = [252, 0, 68];
let  amEndColor= [255, 219, 151];
let amStartColor = [252, 0, 68];
let pmStartColor = [98, 147, 255];
let pmEndColor = [170, 77, 177];

function grabValues() {
	
	console.log("grabValues()");
	// Message.clear();
	
	let currentTask = Task.createTask();
	console.log(currentTask);
	if (currentTask !== false) {
		
		document.getElementById('time-form').reset();
		document.getElementById('task-input').blur();
		Task.displayTimes(currentTask);
	}
	
}
window.grabValues = grabValues;

//TODO need to find a way to send current color info so when we colorchange to an error we can color change back to normal
function colorChange(timePeriod, AmPm) {
	console.log("colorChange()", timePeriod);
	
	let goalColor, endGoalColor;
    let startColor, endColor;
	
	
	if(AmPm === "am"){
		goalColor = amEndColor;
		endGoalColor = amStartColor;
		startColor = [90, 147, 255];
		endColor = [170, 77, 177];
	}
	
	if(AmPm === "pm"){
		goalColor = pmStartColor;
		endGoalColor = pmEndColor;
		startColor = [255, 219, 151];
		endColor = [252, 0, 151];
	}
	
	
	let timeBody = document.getElementById(`${timePeriod}-body`);


	function increaseColor() {
	    //will turn false if we hav eto increase the color values
		let startFinished = true;
		let endFinished = true;

		//these will hold the rgb(#,#,#) value
        let startColorString = "";
        let endColorString = "";

		//TODO need to refactor this so we're not mapping back to back. Will also need to be able to change to an error
		startColor = startColor.map((x, i) =>{
			if(x < goalColor[i]){
				x += 1;
				startFinished = false;
			} else if (x > goalColor[i]){
				x -= 1;
				startFinished = false;
			}
			return x;
		});
		
		endColor = endColor.map((x, i) =>{
			if( x < endGoalColor[i]){
				x += 1;
				endFinished = false;
			} else if (x > endGoalColor[i]){
				x -= 1;
				endFinished = false;
			}
			return x;
		});
		

        startColor.map( (x,i) => {
            //if  we are at the end of the array don't add a coma
            startColorString += i < 2 ? `${x}, ` : `${x}`;
        });

        endColor.map( (x, i) => {
            //if  we are at the end of the array don't add a coma
            endColorString += i < 2 ? `${x}, ` : `${x}`;
        });

        // console.log("start:", startColorString);
        // console.log("end:", endColorString);

        //TODO will probably need to add more vendor prefixes here
		timeBody.style.background = `-webkit-linear-gradient(top, rgb(${startColorString}) 0%,rgb(${endColorString}) 100%)`;
		timeBody.style.background = `-moz-linear-gradient(top, rgb(${startColorString}) 0%, rgb(${endColorString}) 100%)`;

		//if we have to increase the color value these are set to false
        //once the color values are the same we can clear the interval
		if(startFinished && endFinished){
			clearInterval(colorIntervalTimer);
		}
		
	}
	
	let colorIntervalTimer = setInterval(increaseColor);
}

function increaseColor(timeFrame, currentTimePeriod) {
    console.log("inside this version of increaseColor");
    //TODO figure out if this is what you are acctually running
    //TODO you can probably get rid of this call and have setAMoRpm call the above function instead of this one
	if (currentTimePeriod === "am") {
		colorChange(timeFrame, "am");
	}
	
	if (currentTimePeriod === "pm") {
		colorChange(timeFrame, "pm");
	}
	
}


function setAmOrPm(timeFrame, value) {
	console.log("setAmOrPm");

	if (value === "am") {
		increaseColor(timeFrame, value)
	}
	
	if (value === "pm") {
		increaseColor(timeFrame, value);
	}
	
}
window.setAmOrPm = setAmOrPm;

// ======================================
//  Event Listeners
// ======================================

function setTimeClasses(event) {
	if (event.target.name === "start-time-frame") {
		if (event.target.id === "start-am") {
			setAmOrPm("start", "am");
		}
		
		if (event.target.id === "start-pm") {
			setAmOrPm("start", "pm")
		}
	}
	
	if (event.target.name === "end-time-frame") {
		if (event.target.id === "end-am") {
			setAmOrPm("end", "am");
		}
		
		if (event.target.id === "end-pm") {
			setAmOrPm("end", "pm");
		}
	}
}


for (let radio of radioButtons) {
	radio.addEventListener("click", function (event) {
		setTimeClasses(event);
	})
}
