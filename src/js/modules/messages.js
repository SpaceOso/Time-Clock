
//error message holder
const errorParent = document.getElementById('error-message');

export const errorText = {
    notANumber: "Please inter a valid integer.",
    notAllForms: "Please enter a valid time into the remaining boxes.",
    hourTooHigh: "Please enter less than 12 for an hour.",
    minutesTooHigh: "Please enter less than 60 for minutes.",
    higherStartTime: "Start time should be less than end time.",
    startTimeInvalid: "Please enter a valid number for the start time",
    hourInvalid: "Please enter a valid number for the hour",
    minutesInvalid: "Please enter a valid number for the minute input",
    endTimeInvalid: "Please enter a valid number for the end time",
    sameTimes: "Times can't be the same."
};

export function throwError(objectToError, addClass, errorMessage) {
    console.log(objectToError);
	let objToError = document.getElementById(objectToError);
	
    if (addClass) {
	    objToError.classList.add('error');
        error(errorMessage);
    } else {
	    objToError.classList.remove('error');
    }
}

export function error(errorMessage) {
    errorParent.innerHTML = errorMessage;
}


export function clear() {
    error('');
}