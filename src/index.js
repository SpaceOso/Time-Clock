import React from 'react';
import ReactDOM from 'react-dom';

//React components
import Title from './js/components/title';
import TimeInputContainer from './js/components/time-input/time-input-container';
import TaskNameInput from './js/components/task-name-input';
import ErrorContainer from './js/components/error/error-container';

import "./styles/styles.scss";


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			startTime: {
				hour: "",
				minutes: "",
				error: []
			},
            endTime: {
                hour: "",
                minutes: "",
                error: []
            }
		}
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


ReactDOM.render(<App />, document.getElementById('root'));

