/**
 * Created by Rico on 3/16/2017.
 */
'use strict';

let taskNameID = '';
let isEditing = false;

//inputs
let taskNameInput = document.getElementById('task-input');
let startTimeHourInput = document.getElementById('start-time-hour');
let startTimeMinuteInput = document.getElementById('start-time-minutes');
let endTimeHourInput = document.getElementById('end-time-hour');
let endTimeMinuteInput = document.getElementById('end-time-minutes');

//buttons
const startTimeFrameBtn = document.getElementById('start-time-btn');
const endTimeFrameBtn = document.getElementById('end-time-btn');



function getAmOrPM() {
    return {
        startPm: startTimeFrameBtn.value === 'pm',
        endPM: endTimeFrameBtn.value === 'pm'
    };
}


export function createTask() {
    
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



function blurTaskName(newTaskNameInput) {
    console.log("inside blurTaskName");
    
    let newTaskName = newTaskNameInput.target.value;
    
    newTaskNameInput.target.classList.add('hide');
    
    // let taskNameElement = document.getElementById(event.target.);
    isEditing = false;
}


function clickedName(event){
    console.log("Something has been clicked in the DOM");
    console.log(event);
    
    //get the content of the taskname
    let taskNameContent = event.target.innerHTML;
    let taskNameInput;
    console.log("content was: ", taskNameContent);
    
    
    if(!isEditing){
        
        taskNameID = event.target.id;
        
        event.target.classList.add('hide');
        
        taskNameInput = document.getElementById(taskNameID + '-modify');
        
        
        taskNameInput.value = taskNameContent;
        
        taskNameInput.classList.remove('hide');
        taskNameInput.focus();
        
        taskNameInput.addEventListener('blur', blurTaskName);
        isEditing = true;
    }
    
}


//stamps out the template for the new task panel
export function createPanel(taskCount) {
    
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
    
    let taskName = document.getElementById(`task-name-${taskCount}`);
    
    taskName.addEventListener('click', clickedName)
}
