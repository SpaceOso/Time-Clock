//save the start time
export function saveStartTime(time) {
    console.log('inside the action: ', time);
    return {
        type: 'SAVE_START_TIME',
        payload: time
    }
}

//create end time
export function saveEndTime(time){
    return{
        type: 'SAVE_END_TIME',
        payload: time
    }
}

//add to total time
export function addTotalTime(time){
    return{
        type: 'ADD_TO_TOTAL',
        time
    }
}