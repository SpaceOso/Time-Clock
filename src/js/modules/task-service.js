/**
 * Created by Rico on 3/26/2017.
 *
 * Purpose of this module is to handle everything with saving/deleting of the times stored in timeCollections
 */

import * as TimeMath from "./time-clock-math";
import * as Message from "./messages";
import * as TimeFields from "./time-fields";

"use strict";

//view-data
const totalTimeParagraph = document.querySelector('#total-time');

//holds all the approved times
export let timeCollections = [];

export let TOTAL_START_MINUTES = 0;
export let TOTAL_END_MINUTES = 0;

export function getTotalTimes() {
    console.log("inside getTotalTimes()");
    // console.log(timeCollections);
    
    let totalSavedHours = 0;
    let totalSavedMinutes = 0;
    
    
    for (let value of timeCollections) {
        totalSavedHours += value.totalTimeSpentHours;
        totalSavedMinutes += value.totalTimeSpentMinutes;
    }
    
    
    totalSavedMinutes += totalSavedHours * 60;
    
    return {
        totalHours: TimeMath.getHours(totalSavedMinutes),
        totalMinutes: TimeMath.getRemainingMinutes(totalSavedMinutes)
    };
    
}

export function updateTotalTime() {
    
    let {totalHours: taskHours, totalMinutes: taskMinutes} = getTotalTimes();
    
    totalTimeParagraph.innerHTML = `Total Time: ${taskHours}.${taskMinutes}`;
}

export function getCollectionLength() {
    console.log('getCollectionLength()', timeCollections.length);
    return timeCollections.length;
}

export function deleteTask(event) {
    
    let taskPanelContainer = document.querySelector('.task-holder');
    
    let panelID = event.target.dataset.taskCount;
    
    let taskPanelToDelete = document.getElementById(`task-${panelID}`);
    
    taskPanelContainer.removeChild(taskPanelToDelete);
    
    console.log('panelID', panelID);
    
    timeCollections = timeCollections.filter(collection => collection.taskID != panelID);
    
    console.log(timeCollections);
    
    updateTotalTime();
    /*TODO: Need to then reflect this removal in the TimeCollections array. Also need to update the global times*/
}

export function createUniqueId () {
    // desired length of Id
    const idStrLen = 32;
    // always start with a letter -- base 36 makes for a nice shortcut
    let idStr = (Math.floor((Math.random() * 25)) + 10).toString(36) + "_";
    // add a timestamp in milliseconds (base 36 again) as the base
    idStr += (new Date()).getTime().toString(36) + "_";
    // similar to above, complete the Id using random, alphanumeric characters
    do {
        idStr += (Math.floor((Math.random() * 35))).toString(36);
    } while (idStr.length < idStrLen);
    
    return (idStr);
}

export function confirmInputs(currentTask) {
    
    //if the pm property is set to true then we need to convert it to military time
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
        Message.error(Message.errorText.sameTimes);
        TimeFields.errorBothGroups(true);
        return false;
    }
    
    if(TOTAL_START_MINUTES >= TOTAL_END_MINUTES){
        Message.error(Message.errorText.higherStartTime);
        TimeFields.errorBothGroups(true);
        return false;
    }
    
    if (TOTAL_START_MINUTES < TOTAL_END_MINUTES) {
        TimeFields.errorBothGroups(false);
        return true;
    }
    
}

export function confirmTaskName(taskName){
    //we need to check if the user entered blank characters such as spaces or tabs
    //if they did we need to return a standard default message

    return taskName.replace(/\s/g, '').length === 0 ? "Please Enter A Task Name" : taskName;
}