import * as Task from "./modules/task";
import * as Message from "./modules/messages";

import "../styles/styles.scss";

function grabValues() {

    Message.clear();
    
    let currentTask = Task.createTask();
    console.log(currentTask);
    if(currentTask !== false){
        document.getElementById('task-input').blur();
        document.getElementById('time-form').reset();
        Task.displayTimes(currentTask);
    }
    
}
window.grabValues = grabValues;


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