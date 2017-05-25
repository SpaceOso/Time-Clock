function startTimes(state=[],action){
	switch(action.type){
		case 'SAVE_START_TIME':
			return Object.assign({}, state, {hour: action.payload});
			
			// return state;
		default:
			return state;
	}
}

export default startTimes;