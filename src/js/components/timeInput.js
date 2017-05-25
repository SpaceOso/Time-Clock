import React from 'react';

import {removeWhiteSpace, checkForNumber} from '../utils/time-fields';
import errorMessages from '../utils/error-messages';


class TimeInput extends React.Component {
	constructor(props){
		super(props);
	}
	// =========================================
	throwError(message) {
		this.props.throwError(message);
	}
	
	// =========================================
	removeError(error) {
		this.props.removeError();
	}
	
	// =========================================
	checkAndRemoveError(){
		// this.props.checkAndRemoveError();
	}
	// =========================================
	formatTimeInput(timeStr) {
		console.log("formatTimeInput:", timeStr);
		
		let hour = timeStr.substr(0, 2);
		let minutes = timeStr.substr(2);
		console.log("hour:", hour, "minutes", minutes);
		
		
		if (hour === "00") {
			console.log("hour cannot be 00");
			//TODO throw error
			this.throwError(this.props.timeGroup, "testing error message");
			// Message.throwError(timeGroup, Message.errorText.hourInvalid);
		}
		
		//TODO figure out how to get either the end or start
		if (this.props.timeGroup === "start-body") {
			//TODO figure out how to set global state so the app can read both start and end times
			// startTimeValues = {hour: hour, minutes: minutes};
			console.log('This input is the start frame');
		}
		
		if (this.props.timeGroup === "end-body") {
			// endTimeValues = {hour: hour, minutes: minutes};
			console.log('This input is the end frame');
		}
		
		return `${hour} : ${minutes}`;
	}
	
	// =========================================
	setHour(value) {
		
		let modifiedValue = "";
		value = value.substr(0, 2);
		
		if (checkForNumber(value) !== null) {
			//now we know the value is a number
			if (+value > 12) {
				return modifiedValue = `0${value}`;
			}
		}
		
		return modifiedValue;
	}
	
	// =========================================
	validateTimeInput(eventValue) {
		console.log("inside validateTimeInput");
		let updatedValue = "";
		
		//get rid of any empty space
		eventValue = removeWhiteSpace(eventValue);
		
		if (checkForNumber(eventValue) === null) {
			console.log("checkForNumber === null");
			this.throwError(errorMessages.notANumber);
		} else {
			this.removeError();
			this.checkAndRemoveError(this.props.timeGroup, 'notANumber');
		}
		
		if (eventValue.length >= 2) {
			updatedValue = this.setHour(eventValue);
			if (updatedValue.length > 0) {
				eventValue = updatedValue;
			}
			
			removeWhiteSpace(eventValue);
		}
		
		if (eventValue.length >= 3) {
			eventValue = this.formatTimeInput(eventValue);
		}
		
		return eventValue;
	}
	
	// =========================================
	handleChange(event) {
		if (event.target.value.length !== 0) {
			event.target.value = this.validateTimeInput(event.target.value);
			this.props.handleChange(event.target.value);
		} else {
			this.removeError();
		}

	}
	
	// =========================================
	
	render() {
		return (
			<input type="text"
			       id={this.props.id}
			       placeholder="hour : minutes"
			       value={this.props.value}
			       maxLength="7"
			       onChange={event => this.handleChange(event)}
			       required
			/>
		)
	}
}

export default TimeInput;