/**
 * Created by Rico on 3/16/2017.
 */
import * as Message from "./messages";

//input groups
const startGroup = document.getElementById('start-body');
const endGroup = document.getElementById('end-body');

function checkForNumber(number) {
    return !isNaN(number);
}

function checkInputGroups(timeGroup) {
    const {hour, minutes} = timeGroup;
    
    //check that the values have content
    if (hour != 0) {
        //check that the values are numbers
        if (checkForNumber(hour) && checkForNumber(minutes)) {
            return true;
        }
    } else {
        return false;
    }
}

export function validateTimeInputs(currentTask) {
   
    //will evaluate to true if each group is confirmed
    let startGroupChecked, endGroupChecked;
    
    if (checkInputGroups(currentTask.startTimes)){
        
        Message.throwError(startGroup, false);
        startGroupChecked = true;
    
    } else {
        
        Message.throwError(startGroup, true);
        startGroupChecked = false;
    
    }
    
    
    if (checkInputGroups(currentTask.endTimes)){
        
        Message.throwError(endGroup, false);
        endGroupChecked = true;
        
    } else {
        
        Message.throwError(endGroup, true);
        endGroupChecked = false;
    
    }
    
    if(startGroupChecked === true && endGroupChecked === true){
        return true;
    }else{
        return false;
    }
  
}
