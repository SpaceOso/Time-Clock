
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
