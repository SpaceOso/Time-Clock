/**
 * Created by Rico on 3/16/2017.
 */
import * as Message from "./messages";
import * as TimeMath from "./time-clock-math";
import * as TaskService from "./task-service";
//input groups
const startGroup = 'start-body';
const endGroup = 'end-body';


function checkTimeLimits(timeGroup){
	// console.log("checkTimeLimits()");
	const {hour, minutes} = timeGroup;
	
	let timeLimitsValidated = true;
	
	if(hour > 12){
		Message.throwError(timeGroup.id, true, Message.errorText.hourTooHigh );
		console.log('hour too high');
		timeLimitsValidated = false;
	}
	
	if(minutes > 59 ){
		console.log("CHECKING MINUTES");
	    Message.throwError(timeGroup.id, true, Message.errorText.minutesTooHigh);
	    console.log('minutes too high');
	    timeLimitsValidated = false;
    }
	
	return timeLimitsValidated;
}

function checkForNumber(timeGroup) {
	console.log("checkForNumber");
	
	const {hour, minutes, id} = timeGroup;
	
	let reg = /^\d+$/;
	
	let numbersValidated = true;
	
	console.log('minutes before string:', minutes);
	console.log("minutes to string:", minutes.toString());
	
	if(minutes.length < 2){
		console.log(`${id} minutes are less than 2`);
		Message.throwError(id, true, Message.errorText.minutesDoubleDigits);
		numbersValidated = false;
	}
	
	if(hour.match(reg) === null){
		console.log(`${id} hour matched`);
		Message.throwError(id, true, Message.errorText.hourInvalid);
		numbersValidated = false;
	}
	
	if(minutes.match(reg) === null){
		console.log(`${id} minutes matched`);
		Message.throwError(id, true, Message.errorText.minutesInvalid);
		numbersValidated = false;
	}
	
	return numbersValidated;
}

//checks that both values entered are numbers
function checkInputGroups(currentTask) {
	console.log("checkInputGroups");
 
	const {startTimes, endTimes} = currentTask;
 
	//will evaluate to true if each group is confirmed
	let startGroupChecked = false;
	let endGroupChecked = false;
	
	if(startTimes.hour.length === 0 && startTimes.minutes.length === 0 && endTimes.hour.length === 0 && endTimes.minutes.length === 0){
		Message.throwError("both", true, Message.errorText.enterTimes);
		return false;
	}
	
    if(startTimes.hour.length !== 0 || endTimes.hour.length !== 0 ){
    	
    	if(!checkForNumber(startTimes)){
    		console.log("start times is not set correctly");
    		Message.throwError(startTimes.id, true, Message.errorText.startTimeInvalid);
	    } else {
    		startGroupChecked = true;
		    Message.throwError(startTimes.id, false, "");
	    }
	    
	    if(checkForNumber(endTimes)){
	    	endGroupChecked = true;
	    	Message.throwError(endTimes.id, false, "");
	    }
    }
    
    if(!checkTimeLimits(startTimes)){
    	startGroupChecked = false;
    }
    
    if(!checkTimeLimits(endTimes)){
    	endGroupChecked = false;
    }
    
	if(startGroupChecked === true && endGroupChecked === true){
		Message.clear();
		return true;
	}else{
		return false;
	}

}


//will check that inputs are numbers
export function validateTimeInputs(currentTask) {
   console.log("validateTimeInputs");
	
    if (checkInputGroups(currentTask) === true){
        console.log("checkInputGroups was correct");
        return true;
    } else {
    	return false;
    }
  
}

function checkHours(currentTask){
	console.log("checkHours");
	let hoursValidated = true;
	
	//TODO need to throw error that times higher than 12 are not allowed for the hour
	if(currentTask.startTimes.hour > 12){
		console.log("start times hour is higher than 12");
		Message.throwError(currentTask.startTimes.id, true, Message.errorText.hourTooHigh);
		hoursValidated = false;
	}
	//TODO need to throw error that times higher than 12 are not allowed for the hour
	if(currentTask.endTimes.hour > 12){
		console.log("end times hour is higher than 12");
		Message.throwError(currentTask.startTimes.id, true, Message.errorText.hourTooHigh);
		hoursValidated = false;
	}
	
	return hoursValidated;
}

function checkMinutes(currentTask){
	console.log("checkMinutes");
	
	let minutesValidated = true;
	
	if(currentTask.startTimes.minutes > 60){
		console.log("start time minutes too high");
		Message.throwError(currentTask.startTimes.id, true, Message.errorText.minutesTooHigh);
		minutesValidated = false;
	}
	
	if(currentTask.endTimes.minutes > 60){
		console.log("start time minutes too high");
		Message.throwError(currentTask.endTimes.id, true, Message.errorText.minutesTooHigh);
		minutesValidated = false;
	}
	
	return minutesValidated;
}

export function confirmInputs(currentTask) {
	console.log("confirmInputs()");
	if(!checkHours(currentTask)){
		return false;
	}
	
	if(!checkMinutes(currentTask)){
		return false;
	}
	
	
	//if the pm property is set to true then we need to convert it to military time
	if (currentTask.startTimes.pm === true) {
		
		if (currentTask.startTimes.hour <= 12) {
			currentTask.startTimes.hour += 12;
		}
		
	} else {
		//checking for times under am setting
		if(currentTask.startTimes.hour === 12){
			//we are starting at midnight
			currentTask.startTimes.hour = 0;
		}
	}
	
	if (currentTask.endTimes.pm === true) {
		
		if (currentTask.endTimes.hour <= 11) {
			currentTask.endTimes.hour += 12;
		}
	} else {
		if(currentTask.endTimes.hour === 12){
			currentTask.endTimes.hour = 24;
		}
	}
	
	
	//convert hours to minutes
	let startHourInMinutes = TimeMath.getMinutesFromHours(currentTask.startTimes.hour);
	let endHourInMinutes = TimeMath.getMinutesFromHours(currentTask.endTimes.hour);
	
	console.log("startHourInMinutes", startHourInMinutes);
	console.log("endHourINminutes", endHourInMinutes);
	
	TaskService.TOTAL_START_MINUTES = startHourInMinutes + +currentTask.startTimes.minutes;
	TaskService.TOTAL_END_MINUTES = endHourInMinutes + +currentTask.endTimes.minutes;
	
	console.log('total start', TaskService.TOTAL_START_MINUTES);
	console.log('total end', TaskService.TOTAL_END_MINUTES);
	
	
	if (TaskService.TOTAL_START_MINUTES === TaskService.TOTAL_END_MINUTES) {
		Message.error(Message.errorText.sameTimes);
		errorBothGroups(true);
		return false;
	}
	
	if(TaskService.TOTAL_START_MINUTES >= TaskService.TOTAL_END_MINUTES){
		Message.throwError(startGroup, true, Message.errorText.higherStartTime);
		return false;
	}
	
	if (TaskService.TOTAL_START_MINUTES < TaskService.TOTAL_END_MINUTES) {
		return true;
	}
	
}

export function errorBothGroups(addOrRemove){
    Message.throwError(startGroup, addOrRemove, Message.errorText.sameTimes);
    Message.throwError(endGroup, addOrRemove, Message.errorText.sameTimes)
}