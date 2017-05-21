import React from 'react';
import ReactDOM from 'react-dom';

import {Provider}  from 'react-redux';
import store from './store';

import styles from './styles/styles.scss';

import App from '../src/js/components/app';

class TimeClock extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		
		return (
			<Provider store={store}>
				<div id="content-container">
					<App />
				</div>
			</Provider>
		)
		
	}
	
}

// export default TimeClock;

ReactDOM.render(<TimeClock />, document.getElementById('root'));

