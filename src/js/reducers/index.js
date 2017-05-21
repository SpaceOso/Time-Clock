import {combineReducers} from 'redux';

import startTimes from './start-time-reducer';
import currentTaskName from './task-name-reducer';


const rootReducer = combineReducers({startTimes, currentTaskName});

export default rootReducer;