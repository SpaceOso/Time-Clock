/**
 * Created by Rico on 3/16/2017.
 *
 * This module deals with creating/deleting and updating the task panels that get created after the user enters a time.
 */
import * as TaskService from "./task-service";
import * as TimeFields from "./time-fields";
import * as TimeMath from "./time-clock-math";

"use strict";

let taskNameID = '';
let isEditing = false;

//inputs
const taskNameInput = document.getElementById('task-input');
const startTimeInput = document.getElementById('start-time');
const endTimeInput = document.getElementById('end-time');

//time values
let startTimeValues;
let endTimeValues;

//time radio buttons
const startTimeZones = document.getElementsByName('start-time-frame');
const endTimeZones = document.getElementsByName('end-time-frame');

//will hold the current editing value
let inEditTaskName;
let deleteColon = false;

//TODO need to create a blur event listener so we can know if we can show the submit times button
//this was changed from blur to keyup, I think it works better this way
startTimeInput.addEventListener("keyup", function (event) {

	if(event.target.value.length === 4){
		event.target.value = formatTimeInput(event.target.value, "start");
	} else {
		//TODO need to throw error here saying to input 4 digits for time 00:00
		//TODO if we're going to go with keyup this error statement needs to be above
		// console.log("Error: Not valid start time");
	}
});

endTimeInput.addEventListener("keyup", function (event) {
	
	if(event.target.value.length === 4){
		event.target.value = formatTimeInput(event.target.value, "end");
	} else {
		//TODO need to throw error here saying to input 4 digits for time 00:00
		// console.log("Error: Not valid start time");
	}
});


function formatTimeInput(timeStr, timeGroup) {
	
	//TODO need to make a function to check that its only digits that we're passing
	let hour = timeStr.substr(0, 2);
	let minutes = timeStr.substr(2);
	console.log("hour:", hour, "minutes", minutes);
	
	if(timeGroup === "start"){
		startTimeValues = {hour: hour, minutes: minutes};
	}
	
	if(timeGroup === "end"){
		endTimeValues = {hour: hour, minutes: minutes};
	}
	
	return `${hour} : ${minutes}`;
}


function getAmOrPM() {

    let startPM = false;
    let endPM = false;
    
    //these are the AmPm buttons, we cycle through to figure if it's pm or am
    startTimeZones.forEach(el => {
        // console.log(el);
        if (el.checked && el.id === "start-pm") {
            console.log(el.id);
            startPM = true;
        }
    });

    endTimeZones.forEach(el => {
        if (el.checked && el.id === "end-pm") {
            console.log(el);
            endPM = true;
        }
    });


    return {
        startPM: startPM,
        endPM: endPM
    };
}

export function createTask() {
    console.log("createTask()");
	
    //returns an object with startTime and endTime AMPM values
    let {startPM, endPM} = getAmOrPM();
	
    let taskName = taskNameInput.value;
	
    //TODO it would be nice if this shit would work
    let currentTask = {
        taskName: TaskService.confirmTaskName(taskName),
        taskID: 'id',
        startTimes: {
            id: 'start-body',
            pm: startPM,
            hour: startTimeValues.hour,
            minutes: startTimeValues.minutes
        },
        endTimes: {
            id: 'end-body',
            pm: endPM,
            hour: endTimeValues.hour,
            minutes: endTimeValues.minutes
        },
        totalTimeSpentHours: 0,
        totalTimeSpentMinutes: 0
    };


    console.log("init task:", currentTask);

    if (TimeFields.validateTimeInputs(currentTask)) {
        console.log('returning this task:', currentTask);

        if (TimeFields.confirmInputs(currentTask)) {

            currentTask.taskID = TaskService.createUniqueId();

            TaskService.timeCollections.push(currentTask);

            console.log('returning this task:', currentTask);
            return currentTask;
        } else {
            return false;
        }
    } else {

        return false;

    }

}

function enableEditing() {
    isEditing = false;
}


function blurTaskName(event) {

    console.log("inside blurTaskName", event);

    let newTaskName = event.target.value;

    event.target.classList.add('hide');

    inEditTaskName.innerHTML = TaskService.confirmTaskName(newTaskName);
    inEditTaskName.classList.remove('hide');
    setTimeout(enableEditing, 500);
}


function clickedName(event) {
    if (!isEditing) {
        console.log("Something has been clicked in the DOM");
        console.log(event);

        //get the content of the taskname
        inEditTaskName = event.target;

        let taskNameContent = inEditTaskName.innerHTML;
        let taskNameEditInput;


        taskNameID = event.target.id;

        inEditTaskName.classList.add('hide');

        taskNameEditInput = document.getElementById(taskNameID + '-modify');

        taskNameEditInput.value = taskNameContent;

        taskNameEditInput.classList.remove('hide');
        taskNameEditInput.focus();

        taskNameEditInput.addEventListener('keydown', function (e) {
            //13 is the keycode for Enter
            if (e.keyCode === 13) {
                blurTaskName(e);
            }
        });

        taskNameEditInput.addEventListener('blur', blurTaskName);
        isEditing = true;
    }

}


//stamps out the template for the new task panel
function createPanel(currentTask) {

    let newTaskParent = document.createElement('div');

    newTaskParent.id = `task-${currentTask.taskID}`;

    // newTaskParent.setAttribute('data-taskCount', currentTask.taskID);

    newTaskParent.classList.add('row', 'task-panel');

    document.querySelector('.task-holder').appendChild(newTaskParent);

    newTaskParent.innerHTML =
        `<div id="task-name-${currentTask.taskID}">
			<p class="task-title" id="task-${currentTask.taskID}-title"></p>
			<input class="task-input-modify hide" id="task-${currentTask.taskID}-title-modify" type="text">
			<p class="task-total" id="total-time-${currentTask.taskID}"></p>
		</div>
		<div id="times-${currentTask.taskID}">
			<p class="times"></p>
		</div>
		<div id="delete-${currentTask.taskID}" data-task-count="${currentTask.taskID}">
		delete this task
		</div>`;

    let taskName = document.getElementById(`task-${currentTask.taskID}-title`);
    let deleteTaskBtn = document.getElementById(`delete-${currentTask.taskID}`);

    deleteTaskBtn.addEventListener('click', TaskService.deleteTask);
    taskName.addEventListener('click', clickedName);
}


function setTimes(timeObject) {

    const {hour, minutes} = timeObject;

    if (hour === 24) {
        return `${hour - 12}:${minutes}am`;
    }

    if (hour === 0) {
        return `${hour + 12}:${minutes}am`;
    }

    if (hour === 12) {
        return `${hour}:${minutes}pm`
    }

    return hour >= 13 ? `${hour - 12}:${minutes}pm` : `${hour}:${minutes}am`;

}

export function displayTimes(currentTask) {
    console.log('displayTimes(currentTask, taskCount)', currentTask, currentTask.taskID);

    //create the elements first because we reference them via ID
    createPanel(currentTask);

    let taskNameSelector = document.querySelector(`#task-${currentTask.taskID}-title`);
    let totalTimeSelector = document.querySelector(`#total-time-${currentTask.taskID}`);
    let timesParagraph = document.querySelector(`#times-${currentTask.taskID} p`);
    let totalHours = TimeMath.getHours(TaskService.TOTAL_END_MINUTES - TaskService.TOTAL_START_MINUTES);
    let totalMinutes = TimeMath.getRemainingMinutes(TaskService.TOTAL_END_MINUTES - TaskService.TOTAL_START_MINUTES);


    let startTime = setTimes({hour: currentTask.startTimes.hour, minutes: currentTask.startTimes.minutes});
    let endTime = setTimes({hour: currentTask.endTimes.hour, minutes: currentTask.endTimes.minutes});


    console.log('totalHours: ', totalHours);

    if (totalHours < 1) {
        totalHours = 0;
    }

    console.log(currentTask.taskName);
    taskNameSelector.innerHTML = `${currentTask.taskName}`;
    totalTimeSelector.innerHTML = `Time: ${totalHours}.${totalMinutes}`;

    timesParagraph.innerHTML = `${startTime} - ${endTime}`;


    currentTask.totalTimeSpentHours = totalHours;
    currentTask.totalTimeSpentMinutes = totalMinutes;

    TaskService.updateTotalTime();

}