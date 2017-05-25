export function addError(errorMessage){
	console.log("inside the error function with error message:");
	console.log(errorMessage);
	return{
		type: "ADD_ERROR",
		errorMessage
	}
}