import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//actions
import * as errorActions from '../actions/errorActions';

class ErrorContainer extends React.Component {
	/*This component needs to be fed an array with error messages. We will loop through all the messages in the array
	 * Error format: {timeGroup}: {errorMessage} = 'Start Time : invalid time*/
	
	
	render() {
		let i = 0;
		
		let errorList = this.props.currentErrors.map(msg =>
			<p id="error-message" key={i++}>{msg.message}</p>
		);
		
		return (
			<div id="error-container">
				{errorList}
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		currentErrors: state.currentErrors
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(errorActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer);