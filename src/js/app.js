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

function colorChange(timePeriod) {
	console.log("colorChange()");
	let goalColor = amStartColor;
	let endGoalColor = amEndColor;
	let timeBody = document.getElementById(`${timePeriod}-body`);
	
	let r1 = 0;
	let g1 = 0;
	let b1 = 0;
	
	let r2 = 0;
	let g2 = 0;
	let b2 = 0;
	
	
	
	function increaseColor() {
		if(r1 < goalColor[0]) {
			r1 += 1;
		}
		
		if(g1 < goalColor[1]){
			g1 += 1;
		}
		
		if(b1 < goalColor[2]){
			b1 += 1;
		}
		
		if(r2 < endGoalColor[0]) {
			r2 += 1;
		}
		
		if(g2 < endGoalColor[1]){
			g2 += 1;
		}
		
		if(b2 < endGoalColor[2]){
			b2 += 1;
		}
		let newStartColor = `${r1}, ${g1}, ${b1}`;
		let newEndColor = `${r2}, ${g2}, ${b2}`;
		console.log(newStartColor);
		console.log(newEndColor);
		timeBody.style.background = `-webkit-linear-gradient(top, rgb(${newStartColor}) 0%,rgb(${newEndColor}) 100%)`;
		timeBody.style.background = `-moz-linear-gradient(top, rgb(${newStartColor}) 0%, rgb(${newEndColor}) 100%)`;
		
	}
	
	setInterval(increaseColor);
}

//TODO need to make this animate the color changes
function increaseColor(timeFrame, currentTimePeriod) {
	let timeBody = document.getElementById(`${timeFrame}-body`);
	
	
	
	//we want to grab each of the rgb values and change them so they match
	//the new color;
	
	if (currentTimePeriod === "am") {
		// console.log("we're switching to pm");
		// timeBody.style.background = `-webkit-linear-gradient(top, rgb(${newStartColor}) 0%,rgb(${newEndColor}) 100%)`;
		// timeBody.style.background = `-moz-linear-gradient(top, rgb(${newStartColor}) 0%, rgb(${newEndColor}) 100%)`;
		// setInterval(colorChange);
		colorChange(timeFrame);
	}
	
	if (currentTimePeriod === "pm") {
		console.log("we're switching to am");
		// timeBody.classList.remove("am-time");
		// timeBody.classList.add("pm-time");
		colorChange(timeFrame);
	}
	
}


function setAmOrPm(timeFrame, value) {
	console.log("setAmOrPm");
	// let timeBody = document.getElementById(`${timeFrame}-body`);
	
	// timeBody.classList.remove("fadeIn");
	
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
