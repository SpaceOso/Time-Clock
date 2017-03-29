
//error message holder
const errorParent = document.getElementById('error-message');

export let errorText = {
    notANumber: "Please inter a valid integer",
    notAllForms: "Please enter a valid time into the remaining boxes",
    higherStartTime: "Start time should be less than end time",
    sameTimes: "Times can't be the same"
};

export function throwError(objectToError, addClass) {
    if (addClass) {
        objectToError.classList.add('has-error');
    } else {
        objectToError.classList.remove('has-error');
    }
}

export function error(errorMessage) {
    errorParent.innerHTML = errorMessage;
}


export function clear() {
    error('');
}