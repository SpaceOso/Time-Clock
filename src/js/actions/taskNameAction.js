export function saveTaskName(name){
	return{
		type: "SAVE_TASKNAME",
		payload: name
	}
}