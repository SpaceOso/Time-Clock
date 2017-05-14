import React from 'react';
import ReactDOM from 'react-dom';

//React components
import Title from './js/components/title';
import "./styles/styles.scss";


class App extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		return (
			<div>
				<Title/>
				<h2> Hello! </h2>
			</div>
		)
		
	}
	
}


ReactDOM.render(<App />, document.getElementById('root'));

