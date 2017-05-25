import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, combineReducers} from 'redux';
import TimeFrame from '../components/timeFrame';

//actions
import * as startTimeActions from '../actions/timeInputActions';
import * as errorActions from '../actions/errorActions'

class TimeInputContainer extends React.Component {
	constructor(props){
		super(props);
		this.timesValidated = false;
		this.startTimeValidated = false;
		this.endTimeValidated = false;
	}
	
	handleTimeChange(time) {
		this.props.saveStartTime(time);
	}
	
	handleEndTime(time){
		this.props.saveEndTime(time);
	}
	
	validateStartTime(){
		this.startTimeValidated = true;
	}
	
	validateEndTime(){
		this.endTimeValidated = true;
	}
	
	createSubmitButton(){
		return(<button>Submit Times</button>)
	}
	
	saveError(error){
		this.props.addError(error);
	}
	
	render() {
		
		return (
			<div>
				<TimeFrame
					timeProperties={this.props.startTimes}
					startFrame="Start Time"
					id="start-body"
					saveError={this.saveError.bind(this)}
					handleChange={this.handleTimeChange.bind(this)}
				/>
				
				<TimeFrame
					timeProperties={this.props.endTimes}
					startFrame="End Time"
					id="end-body"
					handleChange={this.handleEndTime.bind(this)}
				/>
				{/*create submit button once both time frames confirm*/}
				{this.timesValidated === true ? this.createSubmitButton() : ""}
			</div>
		)
	}
}

//this will set the state to props
function mapStateToProps(state) {
	return {
		startTimes: state.startTimes,
		endTimes: state.endTimes,
		totalTime: state.totalTime,
		currentErrors: state.currentErrors
	}
}

//this well set the reducers to props
function mapDispatchToProps(dispatch) {
	return bindActionCreators({...errorActions, ...startTimeActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeInputContainer);
