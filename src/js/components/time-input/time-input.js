import React from 'react';

class TimeInput extends React.Component {

    validateInput(){
        console.log("things are getting changed");
        console.log(this.timeInput);
    }

    render() {
        return (
            <div className="time-input am" id={`${this.props.prefix}-body`}>

                <div className="time-flex">

                    <div className="time-input-group">
                        <label>{this.props.startFrame}</label>
                        <input type="text"
                               id={this.props.id}
                               maxLength="7"
                               placeholder="hour : minutes"
                               ref={(input) => {this.timeInput = input}}
                               onChange={this.validateInput}
                               required/>
                    </div>

                    <div id={`${this.props.prefix}-error`} className="icon-error hidden">
                        <img src="./img/icon-error.svg" alt="error icon"/>
                    </div>
                </div>

                <div className="ampm-toggle-container">

                    <img className="ampm-icon" src="./img/icon-sun.svg" alt="sun icon"/>
                    {/*TODO might need to make slider a new component*/}
                    <div id="start-slider-container" className="slider-container">
                        <div id="start-slider" className="am-setting">
                        </div>
                    </div>

                    <img className="ampm-icon" src="./img/icon-moon.svg" alt="moon icon"/>
                </div>
            </div>
        )
    }
}

export default TimeInput;