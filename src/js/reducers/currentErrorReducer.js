function currentErrors(state=[], action){
	switch(action.type){
		case "ADD_ERROR":
			console.log("we are adding a new error to this!!");
			return state;
		default:
			return state;
	}
}

export default currentErrors;