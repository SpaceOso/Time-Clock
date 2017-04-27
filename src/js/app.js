import * as Task from "./modules/task";
import * as Message from "./modules/messages";
import * as Gradients from "./modules/gradients";

import "../styles/styles.scss";

//The AM or PM radio buttons for both time inputs
let radioButtons = document.querySelectorAll("input[type='radio']");


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



// ======================================
//  Event Listeners
// ======================================

function setTimeClasses(event) {
	if (event.target.name === "start-time-frame") {
		if (event.target.id === "start-am") {
			Gradients.colorChange("start", "am");
		}
		
		if (event.target.id === "start-pm") {
			Gradients.colorChange("start", "pm")
		}
	}
	
	if (event.target.name === "end-time-frame") {
		if (event.target.id === "end-am") {
			Gradients.colorChange("end", "am");
		}
		
		if (event.target.id === "end-pm") {
			Gradients.colorChange("end", "pm");
		}
	}
}


for (let radio of radioButtons) {
	radio.addEventListener("click", function (event) {
		setTimeClasses(event);
	})
}
