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
				<TimeInputContainer/>
				<h2> Hello! </h2>
			</div>
		)
		
	}
	
}


ReactDOM.render(<App />, document.getElementById('root'));

