import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/action-creator';

//React components
import Title from './title';
import TaskName from '../containers/taskNameContainer';
import ErrorContainer from '../containers/errorContainer';
import TimeInputContainer from '../containers/timeInputContainer';

class Main extends React.Component {
	
	render() {
		return (
			<div id="content-container">
				
				<h1>{this.props.currentTaskName}</h1>
				<Title/>
				<TaskName/>
				<TimeInputContainer />
				{this.props.currentErrors.length > 0 ? <ErrorContainer/> : null}
			</div>
		)
		
	}
	
}

//this will set the state to props
function mapStateToProps(state) {
	return {
		startTimes: state.startTimes,
		currentTaskName: state.currentTaskName,
		endTimes: state.endTimes,
		tasks: state.tasks,
		totalTime: state.totalTime,
		currentErrors: state.currentErrors
	}
	
}

//this well set the reducers to props
function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

