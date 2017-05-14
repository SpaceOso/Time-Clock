import * as Gradients from "./gradients";
//error message holder
const errorParent = document.getElementById('error-container');

export const errorText = {
	notANumber: {
		errorID: "notANumber",
		message: "Please inter a valid integer."
	},
	notAllForms: {
		errorID: "notAllForms",
		message: "Please enter a valid time into the remaining boxes."
	},
	hourTooHigh: {
		errorID: "hourTooHigh",
		message: "Please enter less than 12 for an hour."
	},
	minutesTooHigh: {
		errorID: "minutesTooHigh",
		message: "Please enter less than 60 for minutes."
	},
	higherStartTime: {
		errorID: "higherStartTime",
		message: "Start time should be less than end time."
	},
	startTimeInvalid: {
		errorID: "startTimeInvalid",
		message: "Please enter a valid number for the start time"
	},
	hourInvalid: {
		errorID: "hourInvalid",
		message: "Please enter a valid number for the hour"
	},
	minutesInvalid: {
		errorID: "minutesInvalid",
		message: "Please enter a valid number for the minute input"
	},
	minutesDoubleDigits: {
		errorID: "minutesDoubleDigits",
		message: "Please enter a double digit number for minutes"
	},
	endTimeInvalid: {
		errorID: "endTimeInvalid",
		message: "Please enter a valid number for the end time",
	},
	sameTimes: {
		errorID: "sameTimes",
		message: "Times can't be the same.",
	},
	enterTimes: {
		errorID: "enterTimes",
		message: "Please enter times to begin"
	}
	
};

//need to store what errors each time group contains
export let startTimeErrors = {
	currentErrors: []
};

export let endTimeErrors = {
	currentErrors: []
};

export function returnErrorList(timeGroup) {
	console.log("returning errorlist for ", timeGroup);
	return timeGroup === "start-body" ? startTimeErrors.currentErrors : endTimeErrors.currentErrors;
}

export function throwError(objectToError, errorTextObj) {
	console.log("objToError:", objectToError, "errorMessage:", errorTextObj);
	
	if (objectToError === 'both') {
		throwError('start-body', errorTextObj.message);
		throwError('end-body', errorTextObj.message);
		return true;
	}

	//contains the error img
	let errorImgDiv;
	let errorContainer;
	let elementToError = document.getElementById(objectToError);
	
	errorImgDiv = document.getElementById(objectToError === "start-body" ? 'start-error' : "end-error");
	
	if (objectToError === "start-body") {
		errorImgDiv = document.getElementById('start-error');
		errorImgDiv.classList.remove('hidden');
		errorContainer = startTimeErrors.currentErrors;
	} else if (objectToError === "end-body") {
		errorImgDiv = document.getElementById('end-error');
		errorImgDiv.classList.remove('hidden');
		errorContainer = endTimeErrors.currentErrors;
	}
	
	//TODO check to see if the array already contains the errorID if it does don't add it again
	if (!errorContainer.includes(errorTextObj.errorID)) {
		errorContainer.push(errorTextObj.errorID);
	}
	
	console.log(errorContainer);
	
	//if it already has the error class don't try to add another error to it
	if (!elementToError.classList.contains('error')) {
		elementToError.classList.add('error');
		errorImgDiv.classList.remove("hidden");
		Gradients.addError(objectToError, true);
		// Gradients.animateGradient(objectToError, false, true);
		error(errorTextObj);
	}
	
}

export function errorBothGroups() {
	throwError(startGroup, errorText.sameTimes);
	throwError(endGroup, errorText.sameTimes)
}


export function error(errorMessage) {
	
	let newError = document.createElement("p");
	
	newError.dataset.errorId = errorMessage.id;
	newError.innerHTML = errorMessage.message;
	
	errorParent.appendChild(newError);
	
	// errorParent.innerHTML = errorMessage;
}

//TODO need to create a function that removes specific errors as inputs get validated
export function checkAndRemoveError(timeGroup, errorID) {
	let hadError = false;

	let currentErrors = timeGroup === "start-body" ? startTimeErrors.currentErrors : endTimeErrors.currentErrors;
	
	if(currentErrors.includes(errorID)){
		let index = currentErrors.indexOf(errorID);
		currentErrors.splice(index, 1);
		hadError = true;
	}

	//check to see if it still has some other errors
    if(currentErrors.length === 0 && hadError === true){
	    //Since there is no more errors we need to change the input back to it's default colors
	    // Gradients.animateGradient(timeGroup, null, false);
        Gradients.removeError(timeGroup);
        hideErrorSign(timeGroup);
        let timeGroupDiv = document.getElementById(timeGroup);
        timeGroupDiv.classList.remove('error');
    }
	
	
}

function hideErrorSign(timeGroup){
    let errorImgDiv = document.getElementById(timeGroup === "start-body" ? 'start-error' : "end-error");

    errorImgDiv.classList.add('hidden');
}

export function clear() {
	error('');
}