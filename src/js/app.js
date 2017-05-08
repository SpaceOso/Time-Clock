import * as Task from "./modules/task";
import * as TimeSlider from "./modules/time-slider";
import "../styles/styles.scss";


function grabValues() {
	
	console.log("grabValues()");

	let currentTask = Task.createTask();
	console.log(currentTask);
	
	if (currentTask !== false) {
		document.getElementById('time-form').reset();
		document.getElementById('task-input').blur();
		Task.displayTimes(currentTask);
	}
	
}
window.grabValues = grabValues;
