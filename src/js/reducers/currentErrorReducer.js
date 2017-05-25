function currentErrors(state = [], action) {
	switch (action.type) {
		case "ADD_ERROR":
			
			return [...state,
				{
					errorId: action.errorMessage.errorID,
					message: action.errorMessage.message
				}
			];
		default:
			return state;
	}
}

export default currentErrors;