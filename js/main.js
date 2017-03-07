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

//time values
let taskName;

//hours * 60
let startHourInMinutes, endHourInMinutes;
//startHourInMinutes + minutes;
let totalStartMinutes, totalEndMinutes;

let totalTasks = 0;
let timeCollections = [];

let errorText = {
    notANumber: "Please inter a valid integer",
    notAllForms: "Please enter a valid time into the remaining boxes",
    higherStartTime: "Start time should be less than end time",
    sameTimes: "Times can't be the same"
};

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

function createTimeDOM(taskCount) {

    let newTaskParent = document.createElement('div');

    newTaskParent.id = `task-${taskCount}`;

    newTaskParent.classList.add('row', `task-${taskCount}`);

    document.querySelector('.task-holder').appendChild(newTaskParent);

    newTaskParent.innerHTML =
        `<div id="task-name-${taskCount}"></div>
        <div id="start-time-${taskCount}"></div>
        <div id="end-time-${taskCount}"></div>
        <div id="total-time-${taskCount}"></div>`;
}

function setAMPM() {
    //grab the AMPM inputs
    let startAMPMInputs = document.getElementsByName('start-ampm');
    let endAMPMInputs = document.getElementsByName('end-ampm');

    let settingsAMPM = {};

    //check to see if the pm option is checked for the start time
    for(let i = 0; i < startAMPMInputs.length; i++){
        if(startAMPMInputs[i].checked == true){
            settingsAMPM.startPM = startAMPMInputs[i].value == 'start-pm';
        }
    }

    //check to see if the pm option is checked for the end time
    for(let i = 0; i < endAMPMInputs.length; i++){
        if(endAMPMInputs[i].checked == true){
            settingsAMPM.endPM = endAMPMInputs[i].value == 'end-pm';
        }
    }

    return settingsAMPM;
}

function displayTimes(savedTimes, taskCount) {

    //create the elements first because we reference them via ID
    createTimeDOM(taskCount);


    let taskNameSelector = document.querySelector(`#task-name-${taskCount}`);
    let startTimeSelector = document.querySelector(`#start-time-${taskCount}`);
    let endTimeSelector = document.querySelector(`#end-time-${taskCount}`);
    let totalTimeSelector = document.querySelector(`#total-time-${taskCount}`);

    let totalHours = Math.trunc((totalEndMinutes - totalStartMinutes) / 60);
    let totalMinutes = (totalEndMinutes - totalStartMinutes) % 60;

    console.log('totalHours: ', totalHours);

    if(totalHours < 1){
        totalHours = 0;
    }

    taskNameSelector.innerHTML = `Task Name: ${savedTimes.taskName}`;
    startTimeSelector.innerHTML = `Start Time: ${savedTimes.startTimes.hour} : ${savedTimes.startTimes.minutes}`;
    endTimeSelector.innerHTML = `End Time: ${savedTimes.endTimes.hour} : ${savedTimes.endTimes.minutes}`;
    totalTimeSelector.innerHTML = `Total Time: ${totalHours} : ${totalMinutes}`;

}

function confirmInputs(timeObject) {


    if(timeObject.startTimes.pm){
        if(timeObject.startTimes.hour < 12){
            timeObject.startTimes.hour =  timeObject.startTimes.hour + 12;
        }

    }

    if(timeObject.endTimes.pm){
        if(timeObject.endTimes.hour < 12){
            timeObject.endTimes.hour = timeObject.endTimes.hour + 12;
        }
    }

    //convert hours to minutes
    startHourInMinutes = timeObject.startTimes.hour * 60;
    endHourInMinutes = timeObject.endTimes.hour * 60;

    totalStartMinutes = startHourInMinutes + timeObject.startTimes.minutes;
    totalEndMinutes = endHourInMinutes + timeObject.endTimes.minutes;


    if(totalStartMinutes == totalEndMinutes){
        displayErrorMessage(errorText.sameTimes);
        return false;
    }

    if(totalStartMinutes < totalEndMinutes){
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
    if(!confirmInputs(currentTimes)){
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
        timeCollections.push(currentTimes);
        displayTimes(currentTimes, totalTasks);
        document.querySelector('#time-form').reset();
        totalTasks++;
    }

}