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
        return (
            <div id="error-container">
                <p id="error-message">Error: This is a test error message.</p>
                {this.state.errorMessages.map(msg => {
                    {/*return <p id="error-message" key={}> {msg} </p>*/}
                })}
            </div>
        )
    }
}

export default ErrorContainer;