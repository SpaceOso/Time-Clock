// this will be the store for our app
import {createStore, compose} from 'redux';

// iport root reducer
import rootReducer from './js/reducers/index';

/*What is the data for our app going to look like?*/

const defaultState = {
	currentTaskName: '',
	currentErrors: [
	
	],
	startTimes: {
		hour: '',
		minutes: '',
		errors: [],
		timePeriod: ''
	},
	endTimes: {
		hour: '',
		minutes: '',
		errors: [],
		timePeriod: ''
	},
	tasks: [
		{
			name: '',
			startTime: '',
			endTime: '',
			totalTime: '',
			id: ''
		}
	],
	totalTime: ''
};

const store = createStore(rootReducer, defaultState);

export default store;