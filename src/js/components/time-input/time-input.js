import React from 'react';

//modules
import {removeWhiteSpace, checkForNumber} from '../../modules/time-fields';


class TimeInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {timeInput: ''};
        // this.validateInput = this.validateInput.bind(this);
        // this.timeGroup = this.props.timeGroup;
        console.log("a time group has been created with a time group of:", this.props.timeGroup);
    }


    formatTimeInput(timeStr) {
        console.log("formatTimeInput:", timeStr);

        let hour = timeStr.substr(0, 2);
        let minutes = timeStr.substr(2);
        console.log("hour:", hour, "minutes", minutes);

        if (hour === "00") {
            console.log("hour cannot be 00");
            //TODO throw error
            // Message.throwError(timeGroup, Message.errorText.hourInvalid);
        }

        //TODO figure out how to get either the end or start
        // if (timeGroup === "start-body") {
        //     startTimeValues = {hour: hour, minutes: minutes};
        // }
        //
        // if (timeGroup === "end-body") {
        //     endTimeValues = {hour: hour, minutes: minutes};
        // }

        return `${hour} : ${minutes}`;
    }

    setHour(value) {

        let modifiedValue = "";
        value = value.substr(0, 2);

        if (checkForNumber(value) !== null) {
            //now we know the value is a number
            if (+value > 12) {
                return modifiedValue = `0${value}`;

            }
        }

        return modifiedValue;
    }

    //this gets called on keyup for the time inputs
    validateTimeInput(eventValue) {
        let updatedValue = "";

        //get rid of any empty space
        eventValue = removeWhiteSpace(eventValue);

        if (checkForNumber(eventValue) === null) {
            //TODO throw error
            // Message.throwError(timeGroup, Message.errorText.notANumber);
        } else {
            //did not add the error, but we need to check if it had it from a previous check
            //TODO remove error
            // Message.checkAndRemoveError(timeGroup, Message.errorText.notANumber.errorID);
        }

        if (eventValue.length >= 2) {
            updatedValue = this.setHour(eventValue);
            if (updatedValue.length > 0) {
                eventValue = updatedValue;
            }

            removeWhiteSpace(eventValue);
        }

        if (eventValue.length >= 3) {
            console.log("time value length is greater than 3", eventValue);
            eventValue = this.formatTimeInput(eventValue);
        }

        return eventValue;
    }

    handleChange(event) {
        console.log("things are getting changed");
        console.log(event.target.value);

        //TODO: Do we need to clear white space before checking?
        if (event.target.value.length !== 0) {
            event.target.value = this.validateTimeInput(event.target.value);
        }

        this.setState({timeInput: event.target.value});
        console.log(this.state)
    }


    render() {
        return (

            <input type="text"
                   id={this.props.id}
                   placeholder="hour : minutes"
                   value={this.state.timeInput}
                   maxLength="7"
                   onChange={event => this.handleChange(event)}
                   required/>

        )
    }
}

export default TimeInput;