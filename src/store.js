// this will be the store for our app
import {createStore, compose} from 'react';

// iport root reducer
import rootReducer from './reducers/index';

/*What is the data for our app going to look like?*/

const defaultState = {
    currentTaskName:'',
    startTime: {
        hour: '',
        minutes: '',
        errors: [],
        timePeriod: ''
    },
    endTime: {
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
