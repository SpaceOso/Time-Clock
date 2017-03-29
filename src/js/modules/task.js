/**
 * Created by Rico on 3/16/2017.
 *
 * This module deals with creating/deleting and updating the task panels that get created after the user enters a time.
 */
import * as TaskService from "./task-service";
import * as TimeFields from "./time-fields";
import * as Message from "./messages";

"use strict";

let taskNameID = '';
let isEditing = false;

//inputs
const taskNameInput = document.getElementById('task-input');
const startTimeHourInput = document.getElementById('start-time-hour');
const startTimeMinuteInput = document.getElementById('start-time-minutes');
const endTimeHourInput = document.getElementById('end-time-hour');
const endTimeMinuteInput = document.getElementById('end-time-minutes');


//buttons
const startTimeFrameBtn = document.getElementById('start-time-btn');
const endTimeFrameBtn = document.getElementById('end-time-btn');

//will hold the current editing value
let inEditTaskName;


function getAmOrPM() {
    return {
        startPM: startTimeFrameBtn.value === 'pm',
        endPM: endTimeFrameBtn.value === 'pm'
    };
}

export function createTask() {
    //TODO it would be nice if before returning the task we did all the necessary validation
    
    //returns an object with startTime and endTime AMPM values
    let {startPM, endPM} = getAmOrPM();
    
    
    let taskName = taskNameInput.value;
    
    
    let currentTask = {
        taskName: TaskService.confirmTaskName(taskName),
        taskID: 'id',
        startTimes: {
            pm: startPM,
            hour: +startTimeHourInput.value,
            minutes: +startTimeMinuteInput.value,
        },
        endTimes: {
            pm: endPM,
            hour: +endTimeHourInput.value,
            minutes: +endTimeMinuteInput.value
        },
        totalTimeSpentHours: 0,
        totalTimeSpentMinutes: 0
    };
    
    
    if (TimeFields.validateTimeInputs(currentTask)) {
        
        if (TaskService.confirmInputs(currentTask)) {
            currentTask.taskID = TaskService.createUniqueId();
            
            TaskService.timeCollections.push(currentTask);
            
            return currentTask;
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
            if (e.keyCode == 13) {
                blurTaskName(e);
            }
        });
        
        taskNameEditInput.addEventListener('blur', blurTaskName);
        isEditing = true;
    }
    
}


//stamps out the template for the new task panel
export function createPanel(currentTask) {
    
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