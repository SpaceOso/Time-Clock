import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/action-creater';

import Main from './main';

function mapStateToProps(state){
	return {
		startTimes: state.startTimes
	}

}

function mapDispachToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
