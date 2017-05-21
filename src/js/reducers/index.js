import {combineReducers} from 'redux';

//these keys need to be named the same as the keys in the fault state
import startTimes from './startTimes-reducer';
import currentTaskName from './currentTaskName-reducer';
import endTimes from './endTimes-reducer';
import tasks from './tasks-reducer';
import totalTime from './totalTime-reducer';

const rootReducer = combineReducers({startTimes, currentTaskName, endTimes, tasks, totalTime});

export default rootReducer;