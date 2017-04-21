import * as Task from "./modules/task";
import * as Message from "./modules/messages";

import "../styles/styles.scss";

let startRadios = document.getElementsByName("start-time-frame");
let endRadios = document.getElementsByName("end-time-frame");

let radioButtons = document.querySelectorAll("input[type='radio']");

let amStartColor = [255, 219, 151];
let amEndColor = [252, 0, 68];
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

function increaseColor(currentTimePeriod) {
	if(currentTimePeriod === "am"){
		console.log("we're switching to pm")
	}
	
	if(currentTimePeriod === "pm"){
		console.log("we're switching to am");
	}

}


function setAmOrPm(timeFrame, value) {
	console.log("setAmOrPm");
	let timeBody = document.getElementById(`${timeFrame}-body`);
	
	// let timeBodyBtn = document.getElementById(`${timeFrame}-time-btn`);
	
	// timeBody.classList.remove("fadeOut-standard");
	timeBody.classList.remove("fadeIn");
	
	if (value === "am") {
		// timeBody.classList.remove("pm-time");
		// timeBody.classList.add("am-time");
		increaseColor("am")
	}
	
	if (value === "pm") {
		timeBody.classList.remove("am-time");
		timeBody.classList.add("pm-time");
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
