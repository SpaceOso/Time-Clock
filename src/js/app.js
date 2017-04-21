import * as Task from "./modules/task";
import * as Message from "./modules/messages";

import "../styles/styles.scss";

let startRadios = document.getElementsByName("start-time-frame");
let endRadios = document.getElementsByName("end-time-frame");

let radioButtons = document.querySelectorAll("input[type='radio']");


function grabValues() {

    console.log("grabValues()");
    // Message.clear();
	
    let currentTask = Task.createTask();
    console.log(currentTask);
    if(currentTask !== false){
	
	    document.getElementById('time-form').reset();
	    document.getElementById('task-input').blur();
        Task.displayTimes(currentTask);
    }
    
}
window.grabValues = grabValues;


function setAmOrPm(timeFrame, value) {
    console.log("setAmOrPm");
    let timeBody = document.getElementById(`${timeFrame}-body`);

    // let timeBodyBtn = document.getElementById(`${timeFrame}-time-btn`);

    timeBody.classList.remove("fadeOut");
    timeBody.classList.remove("fadeIn");

    if(value === "am"){
        timeBody.classList.add("fadeOut");
        // setTimeout(function () {
        //     console.log("inside this shit");
        //     timeBody.classList.remove("pm-time");
        //     timeBody.classList.add("am-time");
        //     timeBody.classList.add("fadeIn");
        // }, 1500);

        timeBody.classList.remove("pm-time");
        timeBody.classList.add("am-time");
        timeBody.classList.add("fadeIn");
    }

    if(value === "pm"){
        timeBody.classList.remove("am-time");
        timeBody.classList.remove("fadeOut");
        timeBody.classList.add("fadeOut");
        // timeBody.classList.add("pm-time");
    }

    // if (timeBodyBtn.innerHTML === 'Set PM') {
    //     timeBodyBtn.innerHTML = "Set AM";
    //     timeBodyBtn.value = 'pm';
    //     timeBody.classList.remove('day-time');
    //     timeBody.classList.add('night-time');
    //
    // } else if (timeBodyBtn.innerHTML === 'Set AM') {
    //     timeBodyBtn.innerHTML = 'Set PM';
    //     timeBodyBtn.value = 'am';
    //     timeBody.classList.remove('night-time');
    //     timeBody.classList.add('day-time');
    // }
    
}
window.setAmOrPm = setAmOrPm;

// ======================================
//  Event Listeners
// ======================================

function setTimeClasses(event){
    if(event.target.name === "start-time-frame"){
        if(event.target.id === "start-am"){
            setAmOrPm("start", "am");
        }

        if(event.target.id === "start-pm"){
            setAmOrPm("start", "pm")
        }
    }

    if(event.target.name === "end-time-frame"){
        if(event.target.id === "end-am"){
            setAmOrPm("end", "am");
        }

        if(event.target.id === "end-pm"){
            setAmOrPm("end", "pm");
        }
    }
}


for(let radio of radioButtons){
    radio.addEventListener("click", function (event) {
        setTimeClasses(event);
    })
}
