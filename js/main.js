//input groups
const startGroup = document.getElementById('start-time-group');
const endGroup = document.getElementById('end-time-group');

//inputs
let startTimeHourInput = document.getElementById('start-time-hour');
let startTimeMinuteInput = document.getElementById('start-time-minutes');
let endTimeHourInput = document.getElementById('end-time-hour');
let endTimeMinuteInput = document.getElementById('end-time-minutes');

//time values
let startTimeHour, startTimeMinutes;
let endTimeHour, endTimeMinutes;

let totalTimes = 0;
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


function displayTimes(savedTimes) {
    let startTimeSelector = document.querySelector('#start-time-0');
    let endTimeSelector = document.querySelector('#end-time-0');
    let totalTimeSelector = document.querySelector('#total-time-0');

    let totalMinutes = (savedTimes.startTimes.minutes + savedTimes.endTimes.minutes);
    let remainingMinutes = 0;

    if(totalMinutes > 60){
        remainingMinutes = totalMinutes - 60;
    }else{
        remainingMinutes = totalMinutes;
    }


    let hourFromMinutes = Math.floor(totalMinutes / 60);
    let totalHours = savedTimes.startTimes.hour + savedTimes.endTimes.hour + hourFromMinutes;
    console.log(totalHours, remainingMinutes);

    startTimeSelector.innerHTML = `Start Time: ${savedTimes.startTimes.hour}, ${savedTimes.startTimes.minutes}`;
    endTimeSelector.innerHTML = `End Time: ${savedTimes.endTimes.hour}, ${savedTimes.endTimes.minutes}`;
    totalTimeSelector.innerHTML = `Total Time: ${(savedTimes.startTimes.hour + savedTimes.endTimes.hour)}`;
}


function testFunc() {

    let firstGroupChecked, secondGroupChecked;

    //convert inputs into numbers
    startTimeHour = +startTimeHourInput.value;
    startTimeMinutes = +startTimeMinuteInput.value;

    endTimeHour = +endTimeHourInput.value;
    endTimeMinutes = +endTimeMinuteInput.value;


    let currentTimes = {
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
        console.log("the saved times are: ", currentTimes);
        displayTimes(currentTimes);
        totalTimes++;
    }

}