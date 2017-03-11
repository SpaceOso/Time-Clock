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

function getMinutesFromHours(hours){
    return hours * 60;
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

function clickedName(event){
    console.log("Something has been clicked in the DOM");
    console.log(event.target.id);

    event.target.classList.add('hide');

    console.log(event.target.id + '-modify');
    document.getElementById(event.target.id + '-modify').classList.remove('hide');
    // event.target.nodeType =
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
            <input class="task-input-modify hide" id="task-${taskCount}-title-modify" type="text">
            <p class="task-total" id="total-time-${taskCount}"></p>
        </div>
        <div id="times-${taskCount}">
            <p class="times"></p>
        </div>`;

	let testEvent = document.getElementById(`task-name-${taskCount}`);

	testEvent.addEventListener('click', clickedName)
}

function getAmOrPM() {
	//grab the AMPM inputs

	// let settingsAMPM = {};

	// settingsAMPM.startPM = startTimeFrameBtn.value == 'pm';
	// settingsAMPM.endPM = endTimeFrameBtn.value == 'pm';


	return {
	    startPm: startTimeFrameBtn.value == 'pm',
        endPM: endTimeFrameBtn.value == 'pm'
    };

	// return settingsAMPM;
}


function confirmInputs(currentTaskObj) {


	if (currentTaskObj.startTimes.pm) {
		if (currentTaskObj.startTimes.hour < 12) {
			currentTaskObj.startTimes.hour = currentTaskObj.startTimes.hour + 12;
		}

	}

	if (currentTaskObj.endTimes.pm) {
		if (currentTaskObj.endTimes.hour < 12) {
			currentTaskObj.endTimes.hour = currentTaskObj.endTimes.hour + 12;
		}
	}

	//convert hours to minutes
	let startHourInMinutes = getMinutesFromHours(currentTaskObj.startTimes.hour);
	let endHourInMinutes = getMinutesFromHours(currentTaskObj.endTimes.hour);

	totalStartMinutes = startHourInMinutes + currentTaskObj.startTimes.minutes;
	totalEndMinutes = endHourInMinutes + currentTaskObj.endTimes.minutes;


	if (totalStartMinutes == totalEndMinutes) {
		displayErrorMessage(errorText.sameTimes);
		return false;
	}

	if(totalStartMinutes >= totalEndMinutes){
	    displayErrorMessage(errorText.higherStartTime);
        return false;
    }

	if (totalStartMinutes < totalEndMinutes) {
		return true;
	}

}

function createTask() {

    //returns an object with startTime and endTime AMPM values
    let {startPM, endPM} = getAmOrPM();

    return {
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
}

function grabValues() {


	displayErrorMessage('');

    //will evaluate to true if each group is confirmed
	let startGroupChecked, endGroupChecked;
    
	let currentTask = createTask();

	//need a function to check that the second time is not smaller than the first time
	if (!confirmInputs(currentTask)) {
		displayErrorMessage(errorText.higherStartTime);
		return false;
	}


	//check the first group for validation
	if (checkGroups(currentTask.startTimes)) {
		throwError(startGroup, false);
		startGroupChecked = true;
	} else {
		throwError(startGroup, true);
		startGroupChecked = false;
	}

	//check the second group for validation
	if (checkGroups(currentTask.endTimes)) {
		throwError(endGroup, false);
		endGroupChecked = true;
	} else {
		throwError(endGroup, true);
		endGroupChecked = false;
	}


	//when both groups are confirmed move on and save the time inputs
	if (startGroupChecked && endGroupChecked) {
	    //give this current time obj an id
	    currentTask.thisTaskID = totalTasks;
		
	    timeCollections.push(currentTask);
		
		displayTimes(currentTask, totalTasks);
		
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