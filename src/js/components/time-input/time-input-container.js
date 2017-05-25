import React from 'react';

import TimeInput from './time-input-old';
import TimeInputError from './timeFrameError';

class TimeInputContainer extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			errorMessages: []
		};
		
		this.throwError = this.throwError.bind(this);
		this.removeError = this.throwError.bind(this);
		this.checkAndRemoveError = this.checkAndRemoveError.bind(this);
	}
	
	// =========================================
	throwError(timeGroup, error) {
		console.log("Error:", timeGroup, error);
		console.log("Error thrown");
		let errors = this.state.errorMessages.splice();
		errors.push(error);
		this.setState({
			error: true,
			errorMessages: errors
		});
		
	}
	
	// =========================================
	removeError() {
		this.setState({error: false});
	}
	
	// =========================================
	checkAndRemoveError(timeGroup, errorId) {
		/*
		 TODO need to set up a way to check for errors here. If it's true calls removeError()
		 */
		let errorChecked = true;
		if (errorChecked) {
			this.removeError();
		}
		
	}
	
	// =========================================
	render() {
		let error = "";
		
		if (this.state.error) {
			error = <TimeInputError />
		}
		
		return (
			<div className="time-input am" id={this.props.id}>
				
				<div className="time-flex">
					
					<div className="time-input-group">
						<label>{this.props.startFrame}</label>
						
						<TimeInput
							id={this.props.id}
							timeGroup={this.props.timeGroup}
							throwError={this.throwError}
							removeError={this.removeError}
							checkAndRemoveError={this.checkAndRemoveError}
							testCall={this.testCallBack}
						/>
					
					</div>
					
					{error}
				
				</div>
				
				<div className="ampm-toggle-container">
					
					<img className="ampm-icon" src="./img/icon-sun.svg" alt="sun icon"/>
					
					{/*TODO might need to make slider a new component*/}
					<div id="start-slider-container" className="slider-container">
						<div id={`${this.props.prefix}-slider`} className="am-setting">
						</div>
					</div>
					
					<img className="ampm-icon" src="./img/icon-moon.svg" alt="moon icon"/>
				</div>
			
			</div>
		)
	}
}

export default TimeInputContainer;