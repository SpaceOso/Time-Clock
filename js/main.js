//input groups
const startGroup = document.getElementById('start-time-group');
const endGroup = document.getElementById('end-time-group');

//inputs
let taskNameInput = document.getElementById('task-input');
let startTimeHourInput = document.getElementById('start-time-hour');
let startTimeMinuteInput = document.getElementById('start-time-minutes');
let endTimeHourInput = document.getElementById('end-time-hour');
let endTimeMinuteInput = document.getElementById('end-time-minutes');

//error message holder
const errorParent = document.getElementById('error-message');

//buttons
const startTimeFrameBtn = document.getElementById('start-time-btn');
const endTimeFrameBtn = document.getElementById('end-time-btn');



//startHourInMinutes + minutes;
let totalStartMinutes, totalEndMinutes;

let totalTasks = 0;

//holds all the approved times
let timeCollections = [];

let errorText = {
	notANumber: "Please inter a valid integer",
	notAllForms: "Please enter a valid time into the remaining boxes",
	higherStartTime: "Start time should be less than end time",
	sameTimes: "Times can't be the same"
};

//TODO Need to check that the inputs are within the time frames
//for example they shouldn't be able to enter anything above 59 for mins
//they also shouldn't be able to insert something higher than 13 for the hour unless we set it to be military time


function checkForNumber(number) {
	return !isNaN(number);
}

function checkGroups(objecTimes) {

	const {hour, minutes} = objecTimes;

	//check that the values have content
	if (hour != 0) {
		//check that the values are numbers
		if (checkForNumber(hour) && checkForNumber(minutes)) {
			return true;
		}
	} else {
		return false;
	}
}

function displayErrorMessage(errorMessage) {
	errorParent.innerHTML = errorMessage;
}


function throwError(objectToError, addClass) {
	if (addClass) {
		objectToError.classList.add('has-error');
	} else {
		objectToError.classList.remove('has-error');
	}
}

function getHours(minutes){
    return Math.trunc(minutes / 60);
}

function getRemainingMinutes(minutes){
    return minutes % 60;
}

function getTotalTimes() {
    console.log("inside getTotalTimes()");
    console.log(timeCollections);
	
    let totalSavedHours = 0;
    let totalSavedMinutes = 0;


    for(let i = 0; i < timeCollections.length; i++){
        totalSavedHours += timeCollections[i].totalTimeSpentHours;
        totalSavedMinutes += timeCollections[i].totalTimeSpentMinutes;
    }

	totalSavedMinutes += totalSavedHours * 60;
    
    return {totalHours: getHours(totalSavedMinutes), totalMinutes: getRemainingMinutes(totalSavedMinutes)};
	
}

//stamps out the template for the new task panel
function createTaskPanel(taskCount) {

	let newTaskParent = document.createElement('div');

	newTaskParent.id = `task-${taskCount}`;

	newTaskParent.classList.add('row', 'task-panel');

	document.querySelector('.task-holder').appendChild(newTaskParent);

	newTaskParent.innerHTML =
		`<div id="task-name-${taskCount}">
            <p class="task-title" id="task-${taskCount}-title"></p>
            <p class="task-total" id="total-time-${taskCount}"></p>
        </div>
        <div id="times-${taskCount}">
            <p class="times"></p>
        </div>`;
}

function setAMPM() {
	//grab the AMPM inputs

	let settingsAMPM = {};

	settingsAMPM.startPM = startTimeFrameBtn.value == 'pm';
	settingsAMPM.endPM = endTimeFrameBtn.value == 'pm';


	return settingsAMPM;
}



function confirmInputs(timeObject) {


	if (timeObject.startTimes.pm) {
		if (timeObject.startTimes.hour < 12) {
			timeObject.startTimes.hour = timeObject.startTimes.hour + 12;
		}

	}

	if (timeObject.endTimes.pm) {
		if (timeObject.endTimes.hour < 12) {
			timeObject.endTimes.hour = timeObject.endTimes.hour + 12;
		}
	}

	//convert hours to minutes
	let startHourInMinutes = timeObject.startTimes.hour * 60;
	let endHourInMinutes = timeObject.endTimes.hour * 60;

	totalStartMinutes = startHourInMinutes + timeObject.startTimes.minutes;
	totalEndMinutes = endHourInMinutes + timeObject.endTimes.minutes;


	if (totalStartMinutes == totalEndMinutes) {
		displayErrorMessage(errorText.sameTimes);
		return false;
	}

	if (totalStartMinutes < totalEndMinutes) {
		return true;
	}

}


function grabValues() {


	displayErrorMessage('');

	//returns an object with startTime and endTime AMPM values
	let {startPM, endPM} = setAMPM();

	let firstGroupChecked, secondGroupChecked;
    
	let currentTimes = {
		taskName: taskNameInput.value,
		startTimes: {
			pm: startPM,
			hour: +startTimeHourInput.value,
			minutes: +startTimeMinuteInput.value,
		},
		endTimes: {
			pm: endPM,
			hour: +endTimeHourInput.value,
			minutes: +endTimeMinuteInput.value
		}
	};

	//need a function to check that the second time is not smaller than the first time
	if (!confirmInputs(currentTimes)) {
		displayErrorMessage(errorText.higherStartTime);
		return false;
	}


	//check the first group for validation
	if (checkGroups(currentTimes.startTimes)) {
		throwError(startGroup, false);
		firstGroupChecked = true;
	} else {
		throwError(startGroup, true);
		firstGroupChecked = false;
	}

	//check the second group for validation
	if (checkGroups(currentTimes.endTimes)) {
		throwError(endGroup, false);
		secondGroupChecked = true;
	} else {
		throwError(endGroup, true);
		secondGroupChecked = false;
	}


	//when both groups are confirmed move on and save the time inputs
	if (firstGroupChecked && secondGroupChecked) {
	    //give this current time obj an id
	    currentTimes.thisTaskID = totalTasks;
		
	    timeCollections.push(currentTimes);
		
		displayTimes(currentTimes, totalTasks);
		
		document.querySelector('#time-form').reset();
		
		totalTasks++;
	}

}

function displayTimes(savedTimes, taskCount) {
    
    //create the elements first because we reference them via ID
    createTaskPanel(taskCount);
    
    
    let taskNameSelector = document.querySelector(`#task-${taskCount}-title`);
    let totalTimeSelector = document.querySelector(`#total-time-${taskCount}`);
    
    let timesParagraph = document.querySelector(`#times-${taskCount} p`);
    
    let totalTimeParagraph = document.querySelector('#total-time');
    
    
    let totalHours = getHours(totalEndMinutes - totalStartMinutes);
    
    let totalMinutes = getRemainingMinutes(totalEndMinutes - totalStartMinutes);
    
    console.log('totalHours: ', totalHours);
    
    if (totalHours < 1) {
        totalHours = 0;
    }
    
    let startTime = `${savedTimes.startTimes.hour}:${savedTimes.startTimes.minutes}`;
    let endTime = `${savedTimes.endTimes.hour}:${savedTimes.endTimes.minutes}`;
    
    taskNameSelector.innerHTML = `${savedTimes.taskName}`;
    totalTimeSelector.innerHTML = `Time: ${totalHours}.${totalMinutes}`;
    
    timesParagraph.innerHTML = `${startTime} - ${endTime}`;
    
    timeCollections[taskCount].totalTimeSpentHours = totalHours;
    timeCollections[taskCount].totalTimeSpentMinutes = totalMinutes;
    
    
    let {totalHours: taskHours, totalMinutes: taskMinutes} = getTotalTimes();
    
    totalTimeParagraph.innerHTML = `Total Time: ${taskHours}.${taskMinutes}`;
    
}

function SetTime(timeFrame) {

	let timeBody = document.getElementById(`${timeFrame}-body`);
	let timeBodyBtn = document.getElementById(`${timeFrame}-time-btn`);

	console.log(timeBodyBtn.value);

	if (timeBodyBtn.innerHTML == 'Set PM') {
		timeBodyBtn.innerHTML = "Set AM";
		timeBodyBtn.value = 'pm';
		timeBody.classList.remove('day-time');
		timeBody.classList.add('night-time');

	} else if (timeBodyBtn.innerHTML == 'Set AM') {
		timeBodyBtn.innerHTML = 'Set PM';
		timeBodyBtn.value = 'am';
		timeBody.classList.remove('night-time');
		timeBody.classList.add('day-time');
	}

}