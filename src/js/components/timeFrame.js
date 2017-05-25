import React from 'react';

import TimeInput from './timeInput';
import {TimeFrameError} from '../components/timeFrameError';


export class TimeFrameComponent extends React.Component{
	constructor(props){
		super(props);
		this.showError = false;
	}
	
	throwError(message = "no message"){
		// console.log(message);
		// console.log('in parent, we threw the error ))))))))', message.message);
		this.showError = true;
		this.props.saveError(message);
	}
	
	removeError(){
		// console.log("removing the error");
		this.showError = false;
	}
	
	render(){
		
		let error = "";
		
		if (this.showError) {
			error = <TimeFrameError prefix='start' />
		}
		
		return (
			<div className="time-input am" id={this.props.id}>
				
				<div className="time-flex">
					
					<div className="time-input-group">
						<label>{this.props.startFrame}</label>

						<TimeInput
							id={this.props.id}
							value={this.props.value}
							handleChange={this.props.handleChange}
							timeGroup={this.props.timeGroup}
							throwError={this.throwError.bind(this)}
							removeError={this.removeError.bind(this)}
							checkAndRemoveError={this.checkAndRemoveError}
							testCall={this.testCallBack}
						/>
					</div>
					
					{/*TODO this might be a place to create and insert an error component*/}
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

export default TimeFrameComponent;