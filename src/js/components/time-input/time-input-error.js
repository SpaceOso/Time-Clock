import React from 'react';

class TimeInputError extends React.Component{

    render(){
        return(
            <div id={`${this.props.prefix}-error`} className="icon-error">
                <img src="./img/icon-error.svg" alt="error icon"/>
            </div>
        )
    }
}

export default TimeInputError;