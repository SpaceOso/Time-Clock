//save the start time
export function saveStartTime(time) {
    return {
        type: 'SAVE_START_TIME',
        time
    }
}

//create end time
export function saveEndTime(time){
    return{
        type: 'SAVE_END_TIME',
        time
    }
}

//add to total time
export function addTotalTime(time){
    return{
        type: 'ADD_TO_TOTAL',
        time
    }
}