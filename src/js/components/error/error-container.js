import React from 'react';

class ErrorContainer extends React.Component {
	/*This component needs to be fed an array with error messages. We will loop through all the messages in the array
	 * Error format: {timeGroup}: {errorMessage} = 'Start Time : invalid time*/

	
	constructor(props) {
		super(props);
		
		this.state = {
			errorMessages: this.props.messages
		}
		
		
	}
	
	render() {
		let i = 0;
		
		let errorList = this.state.errorMessages.map(msg =>
			<p id="error-message" key={i++}>{msg}</p>
		);
		
		return (
			<div id="error-container">
				<p id="error-message">Error: This is a test error message.</p>
				{errorList}
			</div>
		)
	}
}

export default ErrorContainer;