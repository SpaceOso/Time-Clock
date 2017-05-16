import React from 'react';
import ReactDOM from 'react-dom';

//React components
import Title from './js/components/title';
import TimeInputContainer from './js/components/time-input/time-input-container';
import TaskNameInput from './js/components/task-name-input';

import "./styles/styles.scss";


class App extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		return (
			<div>
				<Title/>
				<TaskNameInput/>
				<TimeInputContainer startFrame="Start Time" prefix="start" id="start-body" timeGroup="start-body"/>
				<TimeInputContainer startFrame="End Time" prefix="end" id="end-body" timeGroup="end-body"/>
				<h2> Hello! </h2>
			</div>
		)
		
	}
	
}


ReactDOM.render(<App />, document.getElementById('root'));

