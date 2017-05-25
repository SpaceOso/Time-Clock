function endTimes(state=[], action){
	console.log(state, action);
	switch(action.type){
		case 'SAVE_END_TIME':
			console.log("we HAVE SAVED THE end TIME  INSIDE");
			return Object.assign({}, state, {hour: action.payload});
		
		// return state;
		default:
			return state;
	}
}

export default endTimes;