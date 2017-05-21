import React from 'react';
import ReactDOM from 'react-dom';

//React components
import Title from './title';
import TimeInputContainer from './time-input/time-input-container';
import TaskNameInput from './task-name-input';
import ErrorContainer from './error/error-container';

class Main extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		
		const testErrors = [];
		
		return (
			<div id="content-container">
				<Title/>
				<TaskNameInput/>
				{/*need to create a parent for the timeInputContainers to communicate with, that parent will then communicate
				 with index.js and if there are errors send them to the errorcontainer*/}
				<TimeInputContainer startFrame="Start Time" prefix="start" id="start-body" timeGroup="start-body"/>
				<TimeInputContainer startFrame="End Time" prefix="end" id="end-body" timeGroup="end-body"/>
				<ErrorContainer messages={testErrors}/>
			</div>
		)
		
	}
	
}

export default Main;

// ReactDOM.render(<Main />, document.getElementById('root'));

