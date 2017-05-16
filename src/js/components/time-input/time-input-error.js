import React from 'react';

class TimeInputError extends React.Component{
    constructor(){
        super();
        //TODO adding a boolean to hide or show the error seems like the best option here
        //TODO just don't know if i need to set it in the state or not or set it in the time input container state
    }

    render(){
        return(
            <div id={`${this.props.prefix}-error`} className="icon-error hidden">
                <img src="./img/icon-error.svg" alt="error icon"/>
            </div>
        )
    }
}

export default TimeInputError;