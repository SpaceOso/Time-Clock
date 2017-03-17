import * as TimeMath from "./modules/time-cock-math";
import * as Task from "./modules/task";
import * as Message from "./modules/messages";
import * as Validator from "./modules/validator";

import "../styles/styles.scss";

//input groups
const startGroup = document.getElementById('start-time-group');
const endGroup = document.getElementById('end-time-group');


//startHourInMinutes + minutes;
window.TOTAL_START_MINUTES = 0;
window.TOTAL_END_MINUTES = 0;

let totalTasks = 0;

//holds all the approved times
let timeCollections = [];

let errorText = {
    notANumber: "Please inter a valid integer",
    notAllForms: "Please enter a valid time into the remaining boxes",
    higherStartTime: "Start time should be less than end time",
    sameTimes: "Times can't be the same"
};


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
    
    return {totalHours: TimeMath.getHours(totalSavedMinutes), totalMinutes: TimeMath.getRemainingMinutes(totalSavedMinutes)};
    
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
    let startHourInMinutes = TimeMath.getMinutesFromHours(currentTaskObj.startTimes.hour);
    let endHourInMinutes = TimeMath.getMinutesFromHours(currentTaskObj.endTimes.hour);
    
    TOTAL_START_MINUTES = startHourInMinutes + currentTaskObj.startTimes.minutes;
    TOTAL_END_MINUTES = endHourInMinutes + currentTaskObj.endTimes.minutes;
    
    
    if (TOTAL_START_MINUTES === TOTAL_END_MINUTES) {
        Message.error(errorText.sameTimes);
        return false;
    }
    
    if(TOTAL_START_MINUTES >= TOTAL_END_MINUTES){
        Message.error(errorText.higherStartTime);
        return false;
    }
    
    if (TOTAL_START_MINUTES < TOTAL_END_MINUTES) {
        return true;
    }
    
}



function grabValues() {
    
    console.log('should work');
    
    Message.clear();
    
    //will evaluate to true if each group is confirmed
    let startGroupChecked, endGroupChecked;
    
    let currentTask = Task.createTask();
    
    //need a function to check that the second time is not smaller than the first time
    if (!confirmInputs(currentTask)) {
        Message.error(errorText.higherStartTime);
        return false;
    }
    
    
    //check the first group for validation
    if (Validator.checkGroups(currentTask.startTimes)) {
        Message.throwError(startGroup, false);
        startGroupChecked = true;
    } else {
        Message.throwError(startGroup, true);
        startGroupChecked = false;
    }
    
    //check the second group for validation
    if (Validator.checkGroups(currentTask.endTimes)) {
        Message.throwError(endGroup, false);
        endGroupChecked = true;
    } else {
        Message.throwError(endGroup, true);
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
window.grabValues = grabValues;

function displayTimes(savedTimes, taskCount) {
    
    //create the elements first because we reference them via ID
    Task.createPanel(taskCount);
    
    
    let taskNameSelector = document.querySelector(`#task-${taskCount}-title`);
    let totalTimeSelector = document.querySelector(`#total-time-${taskCount}`);
    
    let timesParagraph = document.querySelector(`#times-${taskCount} p`);
    
    let totalTimeParagraph = document.querySelector('#total-time');
    
    
    let totalHours = TimeMath.getHours(TOTAL_END_MINUTES - TOTAL_START_MINUTES);
    
    let totalMinutes = TimeMath.getRemainingMinutes(TOTAL_END_MINUTES - TOTAL_START_MINUTES);
    
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
    
    if (timeBodyBtn.innerHTML === 'Set PM') {
        timeBodyBtn.innerHTML = "Set AM";
        timeBodyBtn.value = 'pm';
        timeBody.classList.remove('day-time');
        timeBody.classList.add('night-time');
        
    } else if (timeBodyBtn.innerHTML === 'Set AM') {
        timeBodyBtn.innerHTML = 'Set PM';
        timeBodyBtn.value = 'am';
        timeBody.classList.remove('night-time');
        timeBody.classList.add('day-time');
    }
    
}