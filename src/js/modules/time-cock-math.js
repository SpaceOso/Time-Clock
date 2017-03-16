export function getHours(minutes){
    return Math.trunc(minutes / 60);
}

export function getRemainingMinutes(minutes){
    return minutes % 60;
}

export function getMinutesFromHours(hours){
    return hours * 60;
}