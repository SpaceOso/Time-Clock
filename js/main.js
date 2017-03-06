//input groups
const startGroup = document.getElementById('start-time-group');
const endGroup = document.getElementById('end-time-group');


//inputs
let taskNameInput = document.getElementById('task-input');
let startTimeHourInput = document.getElementById('start-time-hour');
let startTimeMinuteInput = document.getElementById('start-time-minutes');
let endTimeHourInput = document.getElementById('end-time-hour');
let endTimeMinuteInput = document.getElementById('end-time-minutes');

//time values
let taskName;
let startTimeHour, startTimeMinutes;
let endTimeHour, endTimeMinutes;

let totalTasks = 0;
let timeCollections = [];

let errorText = {
    notANumber: "Please inter a valid integer",
    notAllForms: "Please enter a valid time into the remaining boxes",
};

function checkForNumber(number) {
    return !isNaN(number);
}

function checkGroups(objecTimes) {

    //destructering the object
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

    for(let i = 0; i < startAMPMInputs.length; i++){
        if(startAMPMInputs[i].checked == true){
            settingsAMPM.startTime = startAMPMInputs[i].value;
        }
    }

    for(let i = 0; i < endAMPMInputs.length; i++){
        if(endAMPMInputs[i].checked == true){
            settingsAMPM.endTime = endAMPMInputs[i].value;
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

    let totalMinutes = (savedTimes.startTimes.minutes + savedTimes.endTimes.minutes);
    let remainingMinutes = 0;

    if (totalMinutes > 60) {
        remainingMinutes = totalMinutes - 60;
    } else {
        remainingMinutes = totalMinutes;
    }

    let hourFromMinutes = Math.floor(totalMinutes / 60);
    //TODO this is wrong, if the start time was 8:30 and end time was 9 it substracts 8 from 9 giving us an hour spent
    let totalHours = savedTimes.endTimes.hour - savedTimes.startTimes.hour;
    console.log(totalHours, remainingMinutes);

    taskNameSelector.innerHTML = `Task Name: ${savedTimes.taskName}`;
    startTimeSelector.innerHTML = `Start Time: ${savedTimes.startTimes.hour} : ${savedTimes.startTimes.minutes}`;
    endTimeSelector.innerHTML = `End Time: ${savedTimes.endTimes.hour} : ${savedTimes.endTimes.minutes}`;
    totalTimeSelector.innerHTML = `Total Time: ${totalHours} : ${remainingMinutes}`;

}

function confirmInputs(timeObject) {
    //can't check for start time hour to be bigger than end time hour
    //there could be the case when the start and end time both happened during the same hour


    //TODO let minutes = minutes % 60;
    //the above spits out the remaining minutes if you were to enter 90 minutes it will give you 30 back
    if(timeObject.startTimes.pm){
       timeObject.startTimes.hour =  timeObject.startTimes.hour + 12;
    }

    if(timeObject.endTimes.pm){
        timeObject.endTimes.hour = timeObject.endTimes.hour + 12;
    }

    //check if they are both within the same hour
    if(timeObject.startTimes.hour == timeObject.endTimes.hour){
        console.log("they both started at the same time");
        //if they both started at the same hour we then need to check minutes
        if(timeObject.startTimes.minutes < timeObject.endTimes.minutes){
            console.log("we found out the difference based on the minutes");
            return true;
        }
    }

    console.log("hours were not the same so we are just returning the input hours");
    return timeObject.startTimes.hour < timeObject.startTimes.hour;
}


function grabValues() {


    let ampmSettings = setAMPM();
    let startPM, endPM;

    let firstGroupChecked, secondGroupChecked;


    if(ampmSettings.startTime == 'start-pm'){
        startPM = true;
    }

    if(ampmSettings.endTime == 'end-pm'){
        endPM = true;
    }


    //grab task name
    taskName = taskNameInput.value;
    //convert inputs into numbers
    startTimeHour = +startTimeHourInput.value;
    startTimeMinutes = +startTimeMinuteInput.value;

    endTimeHour = +endTimeHourInput.value;
    endTimeMinutes = +endTimeMinuteInput.value;


    let currentTimes = {
        taskName: taskName,
        startTimes: {
            pm: startPM,
            hour: startTimeHour,
            minutes: startTimeMinutes,
        },
        endTimes: {
            pm: endPM,
            hour: endTimeHour,
            minutes: endTimeMinutes
        }
    };

    //need a function to check that the second time is not smaller than the first time
    confirmInputs(currentTimes);


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