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


function displayTimes(savedTimes, taskCount) {

    //create the elements first because we reference them via ID
    createTimeDOM(taskCount);

    //grab the AMPM inputs
    let startAMPM = document.getElementsByName('start-ampm');
    let endAMPM = document.getElementsByName('end-ampm');

    console.log(startAMPM);

    //TODO need to loop through the end ampm buttons
    for(let i = 0; i < startAMPM.length; i++){
        if(startAMPM[i].checked == true){
            console.log(startAMPM[i].value);
        }
    }


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
    let totalHours = savedTimes.endTimes.hour - savedTimes.startTimes.hour;
    console.log(totalHours, remainingMinutes);

    taskNameSelector.innerHTML = `Task Name: ${savedTimes.taskName}`;
    startTimeSelector.innerHTML = `Start Time: ${savedTimes.startTimes.hour} : ${savedTimes.startTimes.minutes}`;
    endTimeSelector.innerHTML = `End Time: ${savedTimes.endTimes.hour} : ${savedTimes.endTimes.minutes}`;
    totalTimeSelector.innerHTML = `Total Time: ${totalHours} : ${remainingMinutes}`;

}

function grabValues() {

    let firstGroupChecked, secondGroupChecked;

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
            hour: startTimeHour,
            minutes: startTimeMinutes,
        },
        endTimes: {
            hour: endTimeHour,
            minutes: endTimeMinutes
        }
    };


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