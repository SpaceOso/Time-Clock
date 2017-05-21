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

//create panel
export function createTimePanel(timeObject){
	return {
		type: 'CREATE_TIME_PANEL',
		timeObject
	}
}

//delete panel
export function deleteTimePanel(timeObject){
	return{
		type: 'DELETE_TIME_PANEL',
		timeObject
	}
}
