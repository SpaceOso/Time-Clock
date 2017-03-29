import * as TimeMath from "./modules/time-clock-math";
import * as Task from "./modules/task";
import * as Message from "./modules/messages";
import * as Validator from "./modules/validator";
import * as TaskService from "./modules/task-service";

import "../styles/styles.scss";

//input groups
const startGroup = document.getElementById('start-time-group');
const endGroup = document.getElementById('end-time-group');


//startHourInMinutes + minutes;
window.TOTAL_START_MINUTES = 0;
window.TOTAL_END_MINUTES = 0;


let totalTasks = 0;


let errorText = {
    notANumber: "Please inter a valid integer",
    notAllForms: "Please enter a valid time into the remaining boxes",
    higherStartTime: "Start time should be less than end time",
    sameTimes: "Times can't be the same"
};


function confirmInputs(currentTask) {
    
    if (currentTask.startTimes.pm === true) {
       
        if (currentTask.startTimes.hour < 12) {
            currentTask.startTimes.hour += 12;
        }
        
    }
    
    if (currentTask.endTimes.pm === true) {
        if (currentTask.endTimes.hour < 12) {
            currentTask.endTimes.hour += 12;
        }
    }
    
    //convert hours to minutes
    let startHourInMinutes = TimeMath.getMinutesFromHours(currentTask.startTimes.hour);
    let endHourInMinutes = TimeMath.getMinutesFromHours(currentTask.endTimes.hour);
    
    TOTAL_START_MINUTES = startHourInMinutes + currentTask.startTimes.minutes;
    TOTAL_END_MINUTES = endHourInMinutes + currentTask.endTimes.minutes;
    
    
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

    Message.clear();
    
    //will evaluate to true if each group is confirmed
    let startGroupChecked, endGroupChecked;
    
    let currentTask = Task.createTask(totalTasks);
    
    
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
        totalTasks = TaskService.getCollectionLength();
        
        // currentTask.taskID = totalTasks;
        currentTask.taskID = TaskService.createUniqueId();
    
        TaskService.timeCollections.push(currentTask);
        
        displayTimes(currentTask, totalTasks);
        
        document.querySelector('#time-form').reset();
        
    }
    
}
window.grabValues = grabValues;

function displayTimes(currentTask) {
     console.log('displayTimes(currentTask, taskCount)', currentTask, currentTask.taskID);
    
     //create the elements first because we reference them via ID
    Task.createPanel(currentTask);
    
    let taskNameSelector = document.querySelector(`#task-${currentTask.taskID}-title`);
    let totalTimeSelector = document.querySelector(`#total-time-${currentTask.taskID}`);
    
    let timesParagraph = document.querySelector(`#times-${currentTask.taskID} p`);
    
    // let totalTimeParagraph = document.querySelector('#total-time');
    
    let totalHours = TimeMath.getHours(TOTAL_END_MINUTES - TOTAL_START_MINUTES);
    
    let totalMinutes = TimeMath.getRemainingMinutes(TOTAL_END_MINUTES - TOTAL_START_MINUTES);
    
    let startTime = `${currentTask.startTimes.hour}:${currentTask.startTimes.minutes}`;
    let endTime = `${currentTask.endTimes.hour}:${currentTask.endTimes.minutes}`;
    
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

function setAmOrPm(timeFrame) {

    let timeBody = document.getElementById(`${timeFrame}-body`);
    let timeBodyBtn = document.getElementById(`${timeFrame}-time-btn`);
    

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
window.setAmOrPm = setAmOrPm;