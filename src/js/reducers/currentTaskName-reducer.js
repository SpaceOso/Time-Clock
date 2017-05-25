function currentTaskName(state=null, action) {
	
	switch(action.type){
		case 'SAVE_TASKNAME' :
			return action.payload;
		default:
			return state
	}
}

export default currentTaskName;