import React from 'react';

import TimeInput from './time-input';

class TimeInputContainer extends React.Component{

    render(){
        return (
            <div>
            <TimeInput startFrame='Start Time' id="start-body" prefix="start"/>
            <TimeInput startFrame="End Time" id="end-body" prefix="end"/>
            </div>
        )
    }
}

export default TimeInputContainer;