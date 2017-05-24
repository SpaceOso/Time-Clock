import React from 'react';

class TimeInput extends React.Component{
    render(){
        return (
            <div className="time-input am" id={this.props.id}>

                <div className="time-flex">

                    <div className="time-input-group">
                        <label>{this.props.startFrame}</label>

                        <TimeInput
                            id={this.props.id}
                            timeGroup={this.props.timeGroup}
                            throwError={this.throwError}
                            removeError={this.removeError}
                            checkAndRemoveError={this.checkAndRemoveError}
                            testCall={this.testCallBack}
                        />

                    </div>

                    {/*TODO this might be a place to create and insert an error component*/}
                    {/*{error}*/}

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

export default TimeInput;