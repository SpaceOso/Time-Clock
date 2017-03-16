/**
 * Created by Rico on 3/16/2017.
 */
export function checkForNumber(number) {
    return !isNaN(number);
}

export function checkGroups(objecTimes) {
    const {hour, minutes} = objecTimes;
    
    //check that the values have content
    if (hour != 0) {
        //check that the values are numbers
        if (checkForNumber(hour) && checkForNumber(minutes)) {
            return true;
        }
    } else {
        return false;
    }
}