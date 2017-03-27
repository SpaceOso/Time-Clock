/**
 * Created by Rico on 3/26/2017.
 */
import * as TimeMath from "./time-clock-math";


//holds all the approved times
export let timeCollections = [];

export function getTotalTimes() {
    console.log("inside getTotalTimes()");
    // console.log(timeCollections);
    
    let totalSavedHours = 0;
    let totalSavedMinutes = 0;
    
    
    for(let i = 0; i < timeCollections.length; i++){
        totalSavedHours += timeCollections[i].totalTimeSpentHours;
        totalSavedMinutes += timeCollections[i].totalTimeSpentMinutes;
    }
    
    totalSavedMinutes += totalSavedHours * 60;
    
    return {totalHours: TimeMath.getHours(totalSavedMinutes), totalMinutes: TimeMath.getRemainingMinutes(totalSavedMinutes)};
    
}

export function deleteTask(event) {

    let taskPanelContainer = document.querySelector('.task-holder');
    
    let panelID = event.target.dataset.taskCount;
    
    let taskPanelToDelete = document.getElementById(`task-${panelID}`);
    
    taskPanelContainer.removeChild(taskPanelToDelete);
    
    /*TODO: Need to then reflect this removal in the TimeCollections array. Also need to update the global times*/
}