
//error message holder
const errorParent = document.getElementById('error-message');

export const errorText = {
    notANumber: "Please inter a valid integer.",
    notAllForms: "Please enter a valid time into the remaining boxes.",
    hourTooHigh: "Please enter less than 12 for an hour.",
    higherStartTime: "Start time should be less than end time.",
    sameTimes: "Times can't be the same."
};

export function throwError(objectToError, addClass) {
    if (addClass) {
        objectToError.classList.add('error');
    } else {
        objectToError.classList.remove('error');
    }
}

export function error(errorMessage) {
    errorParent.innerHTML = errorMessage;
}


export function clear() {
    error('');
}