import React from 'react';

import TimeInput from './time-input';
import TimeInputError from './time-input-error';

class TimeInputContainer extends React.Component{

    testCallBack(){
        console.log("you are now ready!!");
    }

    throwError(timeGroup, error){
        console.log("Error thrown");
        console.log("Error:", timeGroup, error);
    }

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
                            testCall={this.testCallBack}/>

                    </div>
                    {/*TODO this might be a place to create and insert an error component*/}
                    <TimeInputError/>

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