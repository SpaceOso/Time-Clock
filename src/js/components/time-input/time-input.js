import React from 'react';

//modules
import {removeWhiteSpace, checkForNumber} from '../../modules/time-fields';


class TimeInput extends React.Component {
	
	constructor() {
		super();
		this.state = {timeInput: ''};
		// this.validateInput = this.validateInput.bind(this);
	}
	
	
	
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
	
	//this gets called on keyup for the time inputs
	validateTimeInput(eventValue) {
		let updatedValue = "";
		
		//get rid of any empty space
		eventValue = removeWhiteSpace(eventValue);
		
		if (checkForNumber(eventValue) === null) {
			//TODO throw error
			// Message.throwError(timeGroup, Message.errorText.notANumber);
		} else {
			//did not add the error, but we need to check if it had it from a previous check
			//TODO remove error
			// Message.checkAndRemoveError(timeGroup, Message.errorText.notANumber.errorID);
		}
		
		if (eventValue.length >= 2) {
			updatedValue = this.setHour(eventValue);
			if (updatedValue.length > 0) {
				eventValue = updatedValue;
			}
			
			removeWhiteSpace(eventValue);
		}
		
		if (eventValue.length >= 3) {
			console.log("time value length is greater than 3", eventValue);
			eventValue = formatTimeInput(eventValue, timeGroup);
		}
		
		return eventValue;
	}
	
	handleChange(event) {
		console.log("things are getting changed");
		console.log(event.target.value);
		
		if (event.target.value.length !== 0) {
			event.target.value = this.validateTimeInput(event.target.value);
		}
		
		
		this.setState({timeInput: event.target.value});
		console.log(this.state)
	}
	
	
	render() {
		return (
			<div className="time-input am" id={`${this.props.prefix}-body`}>
				
				<div className="time-flex">
					
					<div className="time-input-group">
						<label>{this.props.startFrame}</label>
						<input type="text"
						       id={this.props.id}
						       placeholder="hour : minutes"
						       value={this.state.timeInput}
						       maxLength="7"
						       onChange={event => this.handleChange(event)}
						       required/>
					</div>
					
					<div id={`${this.props.prefix}-error`} className="icon-error hidden">
						<img src="./img/icon-error.svg" alt="error icon"/>
					</div>
				</div>
				
				<div className="ampm-toggle-container">
					
					<img className="ampm-icon" src="./img/icon-sun.svg" alt="sun icon"/>
					{/*TODO might need to make slider a new component*/}
					<div id="start-slider-container" className="slider-container">
						<div id="start-slider" className="am-setting">
						</div>
					</div>
					
					<img className="ampm-icon" src="./img/icon-moon.svg" alt="moon icon"/>
				</div>
			</div>
		)
	}
}

export default TimeInput;