import * as TimeMath from "./modules/time-clock-math";
import * as Task from "./modules/task";
import * as Message from "./modules/messages";
import * as TaskService from "./modules/task-service";

import "../styles/styles.scss";

function grabValues() {

    Message.clear();
    
    let currentTask = Task.createTask();
    

    if(currentTask !== false){
        document.getElementById('task-input').blur();
        document.getElementById('time-form').reset();
        displayTimes(currentTask);
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
    
    let totalHours = TimeMath.getHours(TaskService.TOTAL_END_MINUTES - TaskService.TOTAL_START_MINUTES);
    
    let totalMinutes = TimeMath.getRemainingMinutes(TaskService.TOTAL_END_MINUTES - TaskService.TOTAL_START_MINUTES);
    
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