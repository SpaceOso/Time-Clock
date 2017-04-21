
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
        message:"Please enter less than 12 for an hour."
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
        errorID:"startTimeInvalid",
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
	enterTimes: {errorID: "enterTimes",
        message: "Please enter times to begin"
    }

};

export function throwError(objectToError, addClass, errorMessage) {
    console.log("throwError()");
    console.log("objToError:", objectToError, "addClass:", addClass, "errorMessage:", errorMessage);
    
    if(objectToError === 'both'){
    	throwError('start-body', addClass, errorMessage.message);
    	throwError('end-body', addClass, errorMessage.message );
    	return true;
    }
    
	let objToError = document.getElementById(objectToError);
	
    if (addClass) {
	    objToError.classList.add('error');
        error(errorMessage);
    } else {
	    objToError.classList.remove('error');
    }
}

export function error(errorMessage) {

    let newError = document.createElement("p");

    newError.dataset.errorId = errorMessage.id;
    newError.innerHTML = errorMessage.message;

    errorParent.appendChild(newError);

    // errorParent.innerHTML = errorMessage;
}

//TODO need to create a function that removes specific errors as inputs get validated
export function removeError(errorID) {

}

export function clear() {
    error('');
}