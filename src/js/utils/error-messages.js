const errorMessages = {
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

export default errorMessages;