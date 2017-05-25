function endTimes(state=[], action){
	switch(action.type){
		case 'SAVE_END_TIME':
			return Object.assign({}, state, {hour: action.payload});
		
		// return state;
		default:
			return state;
	}
}

export default endTimes;