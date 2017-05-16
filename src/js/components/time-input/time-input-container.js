import React from 'react';

import TimeInput from './time-input';

class TimeInputContainer extends React.Component{

    render(){
        return (
            <div className="time-input am" id={this.props.id}>

                <div className="time-flex">

                    <div className="time-input-group">
                        <label>{this.props.startFrame}</label>

                        <TimeInput id={this.props.id} timeGroup={this.props.timeGroup}/>

                    </div>

                    <div id={`${this.props.prefix}-error`} className="icon-error hidden">
                        <img src="./img/icon-error.svg" alt="error icon"/>
                    </div>

                </div>

                <div className="ampm-toggle-container">

                    <img className="ampm-icon" src="./img/icon-sun.svg" alt="sun icon"/>
                    {/*TODO might need to make slider a new component*/}
                    <div id="start-slider-container" className="slider-container">
                        <div id={`${this.props.prefix}-slider`} className="am-setting">
                        </div>
                    </div>

                    <img className="ampm-icon" src="./img/icon-moon.svg" alt="moon icon"/>
                </div>

            </div>
        )
    }
}

export default TimeInputContainer;