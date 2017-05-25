export function addError(errorMessage){
	return{
		type: "ADD_ERROR",
		errorMessage
	}
}