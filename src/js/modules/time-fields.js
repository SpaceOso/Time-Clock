/**
 * Created by Rico on 3/16/2017.
 */
import * as Message from "./messages";
import * as TimeMath from "./time-clock-math";
import * as TaskService from "./task-service";

//input groups
const startGroup = 'start-body';
const endGroup = 'end-body';

const startTimeInput = document.getElementById('start-time');
const endTimeInput = document.getElementById('end-time');

//time values
let startTimeValues;
let endTimeValues;

//time radio buttons
const startTimeZones = document.getElementsByName('start-time-frame');
const endTimeZones = document.getElementsByName('end-time-frame');

//TODO need to create a blur event listener so we can know if we can show the submit times button
//this was changed from blur to keyup, I think it works better this way
startTimeInput.addEventListener("keyup", function (event) {
	
	event.target.value = validateTimeInput(event.target.value, startGroup);
	
});

endTimeInput.addEventListener("keyup", function (event) {
	
	event.target.value = validateTimeInput(event.target.value, endGroup);
	
});

function trimTimeString(timeValue){
	return timeValue.replace(/\s:*/g, '');
}

//this gets called on keyup for the time inputs
function validateTimeInput(eventValue, timeGroup){
	let updatedValue = "";
	
	console.log("validateTimeInput", eventValue, "timeFrame", timeGroup);
	
	//get rid of any empty space
	eventValue = trimTimeString(eventValue);
	
	if(checkForNumber(eventValue) === null){
		console.log("we have an error on this input");
		Message.throwError(timeGroup, Message.errorText.notANumber);
	} else {
		//did not add the error, but we need to check if it had it from a previous check
		Message.checkAndRemoveError(timeGroup, Message.errorText.notANumber.errorID);
	}
	
	if(eventValue.length >= 2){
		updatedValue = setHour(eventValue);
		if(updatedValue.length > 0){
			eventValue = updatedValue;
		}
		
		trimTimeString(eventValue);
	}
	
	if(eventValue.length >= 3){
		console.log("time value length is greater than 3", eventValue);
		eventValue = formatTimeInput(eventValue, timeGroup);
	}
	
	return eventValue;
}

function formatTimeInput(timeStr, timeGroup) {
	console.log("formatTimeInput:", timeStr, "timeGroup:", timeGroup);
	let hour = timeStr.substr(0, 2);
	let minutes = timeStr.substr(2);
	console.log("hour:", hour, "minutes", minutes);
	
	if(hour === "00"){
		console.log("hour cannot be 00");
		Message.throwError(timeGroup, Message.errorText.hourInvalid);
	}
	
	if(timeGroup === "start-body"){
		startTimeValues = {hour: hour, minutes: minutes};
	}
	
	if(timeGroup === "end-body"){
		endTimeValues = {hour: hour, minutes: minutes};
	}
	
	return `${hour} : ${minutes}`;
}

export function getTimes(timeGroup){
	if(timeGroup === "start"){
		console.log("grabbed the start:", timeGroup);
		console.log("and returning:", startTimeValues);
		return startTimeValues
	} else if( timeGroup === "end"){
		console.log("grabbed the end:", timeGroup);
		console.log("and returning:", endTimeValues);
		return endTimeValues;
	}
}

function setHour(value){
	let modifiedValue = "";
	value = value.substr(0, 2);
	console.log("inside setHour", value);
	if(checkForNumber(value) !== null){
		console.log("setHour, we know it's a valid number");
		//now we know the value is a number
		if(+value > 12){
			console.log("hour value will be reformated to:", `0${value}`);
			return modifiedValue = `0${value}`;
			
		}
	}
	
	return modifiedValue;
}

export function getAmOrPM() {
	
	let startPM = false;
	let endPM = false;
	
	//these are the AmPm buttons, we cycle through to figure if it's pm or am
	startTimeZones.forEach(el => {
		// console.log(el);
		if (el.checked && el.id === "start-pm") {
			console.log(el.id);
			startPM = true;
		}
	});
	
	endTimeZones.forEach(el => {
		if (el.checked && el.id === "end-pm") {
			console.log(el);
			endPM = true;
		}
	});
	
	
	return {
		startPM: startPM,
		endPM: endPM
	};
}

//checks that the hour and minutes is set correctly
function checkTimeLimits(timeGroup) {
	
	const {hour, minutes} = timeGroup;
	
	let timeLimitsValidated = true;
	
	if (hour > 12) {
		Message.throwError(timeGroup.id, Message.errorText.hourTooHigh);
		console.log('hour too high');
		timeLimitsValidated = false;
	}
	
	if (minutes > 59) {
		console.log("CHECKING MINUTES");
		Message.throwError(timeGroup.id, Message.errorText.minutesTooHigh);
		console.log('minutes too high');
		timeLimitsValidated = false;
	}
	
	return timeLimitsValidated;
}

function checkForNumber(numberToCheck) {
	let reg = /^\d+$/;
	
	return numberToCheck.match(reg);
}

//checks that the hours and minutes are valid numbers
function validateTimePeriods(timeGroup) {
	console.log("validateTimePeriods");
	
	const {hour, minutes, id} = timeGroup;
	
	let numbersValidated = true;
	
	if (minutes.length < 2) {
		// console.log(`${id} minutes are less than 2`);
		Message.throwError(id, Message.errorText.minutesDoubleDigits);
		numbersValidated = false;
	}
	
	if (checkForNumber(hour) === null) {
		// console.log(`${id} hour matched`);
		Message.throwError(id, Message.errorText.hourInvalid);
		numbersValidated = false;
	}
	
	if (checkForNumber(minutes) === null) {
		// console.log(`${id} minutes matched`);
		Message.throwError(id, Message.errorText.minutesInvalid);
		numbersValidated = false;
	}
	
	if(numbersValidated){
		if (!checkTimeLimits(timeGroup)) {
			numbersValidated = false;
		}
	}
	
	return numbersValidated;
}

//checks that both values entered are numbers
export function checkInputGroups(currentTask) {
	console.log("checkInputGroups");
	
	const {startTimes, endTimes} = currentTask;
	
	//will evaluate to true if each group is confirmed
	let startGroupChecked = false;
	let endGroupChecked = false;
	
	//TODO need to only show enter time button when the inputs are validated, that will get rid of this code
	//making sure that the inputs are not empty
	if (startTimes.hour.length === 0 && startTimes.minutes.length === 0 && endTimes.hour.length === 0 && endTimes.minutes.length === 0) {
		console.log("we're in here because something or all are 0");
		Message.throwError("both", Message.errorText.enterTimes);
		return false;
	}
	
	//now we check to see if the values are actual numbers
	if (!validateTimePeriods(startTimes)) {
		// console.log("start times is not set correctly");
		Message.throwError(startTimes.id, Message.errorText.startTimeInvalid);
	} else {
		//TODO need to clear errors here
		startGroupChecked = true;
	}
	
	if (!validateTimePeriods(endTimes)) {
		Message.throwError(endTimes.id, Message.errorText.endTimeInvalid);
	} else {
		//TODO need to clear errors here
		endGroupChecked = true;
	}
	
	if (startGroupChecked === true && endGroupChecked === true) {
		Message.clear();
		return true;
	} else {
		return false;
	}
	
}


function checkHours(currentTask) {
	console.log("checkHours");
	let hoursValidated = true;
	
	if (currentTask.startTimes.hour > 12) {
		console.log("start times hour is higher than 12");
		Message.throwError(currentTask.startTimes.id, Message.errorText.hourTooHigh);
		hoursValidated = false;
	}
	if (currentTask.endTimes.hour > 12) {
		console.log("end times hour is higher than 12");
		Message.throwError(currentTask.startTimes.id, Message.errorText.hourTooHigh);
		hoursValidated = false;
	}
	
	return hoursValidated;
}

function checkMinutes(currentTask) {
	console.log("checkMinutes");
	
	let minutesValidated = true;
	
	if (currentTask.startTimes.minutes > 60) {
		console.log("start time minutes too high");
		Message.throwError(currentTask.startTimes.id, Message.errorText.minutesTooHigh);
		minutesValidated = false;
	}
	
	if (currentTask.endTimes.minutes > 60) {
		console.log("start time minutes too high");
		Message.throwError(currentTask.endTimes.id, Message.errorText.minutesTooHigh);
		minutesValidated = false;
	}
	
	return minutesValidated;
}

export function confirmInputs(currentTask) {
	console.log("confirmInputs()");
	if (!checkHours(currentTask)) {
		return false;
	}
	
	if (!checkMinutes(currentTask)) {
		return false;
	}
	
	//if the pm property is set to true then we need to convert it to military time
	if (currentTask.startTimes.pm === true) {
		
		if (currentTask.startTimes.hour <= 12) {
			currentTask.startTimes.hour += 12;
		}
		
	} else {
		//checking for times under am setting
		if (currentTask.startTimes.hour === 12) {
			//we are starting at midnight
			currentTask.startTimes.hour = 0;
		}
	}
	
	if (currentTask.endTimes.pm === true) {
		
		if (currentTask.endTimes.hour <= 11) {
			currentTask.endTimes.hour += 12;
		}
	} else {
		if (currentTask.endTimes.hour === 12) {
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
		Message.errorBothGroups();
		return false;
	}
	
	if (TaskService.TOTAL_START_MINUTES >= TaskService.TOTAL_END_MINUTES) {
		Message.throwError(startGroup, Message.errorText.higherStartTime);
		return false;
	}
	
	if (TaskService.TOTAL_START_MINUTES < TaskService.TOTAL_END_MINUTES) {
		return true;
	}
	
}

