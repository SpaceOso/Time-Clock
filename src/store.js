// this will be the store for our app
import {createStore, compose} from 'redux';

// iport root reducer
import rootReducer from './js/reducers/index';

/*What is the data for our app going to look like?*/

const defaultState = {
    currentTaskName:'',
    startTimes: {
        hour: '',
        minutes: '',
        errors: [],
        timePeriod: ''
    },
    // endTime: {
    //     hour: '',
    //     minutes: '',
    //     errors: [],
    //     timePeriod: ''
    // },
    // tasks: [
    //     {
    //         name: 'test time',
    //         startTime: '02:00',
    //         endTime: '04:00',
    //         totalTime: '2:00',
    //         id: 'testTime'
    //     }
    // ],
    // totalTime: '2:00'
};

const store = createStore(rootReducer, defaultState);

export default store;