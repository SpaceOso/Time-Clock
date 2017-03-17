
//error message holder
const errorParent = document.getElementById('error-message');

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