function startTimes(state=[],action){
	console.log(state, action);
	switch(action.type){
		case 'SAVE_START_TIME':
			console.log("we HAVE SAVED THE START TIME  INSIDE");
			return Object.assign({}, state, {hour: action.payload});
			
			// return state;
		default:
			return state;
	}
}

export default startTimes;