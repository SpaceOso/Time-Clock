import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/action-creater';

import Main from './main';

//this will set the state to props
function mapStateToProps(state){
	return {
		startTimes: state.startTimes,
		currentTaskName: state.currentTaskName,
		endTimes: state.endTimes,
		tasks: state.tasks,
		totalTime: state.totalTime
	}

}

//this well set the reducers to props
function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
