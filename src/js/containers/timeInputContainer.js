import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TimeInput from '../components/timeInput';

//actions
import * as timeInputActions from '../actions/timeInputActions';

class TimeInputContainer extends React.Component{
    render(){
        return (
            <div>
                <h1>I'm a time input container</h1>
                <TimeInput />
            </div>
        )
    }
}

// export default TimeInputContainer;




//this will set the state to props
function mapStateToProps(state){
    return {
        startTimes: state.startTimes,
        endTimes: state.endTimes,
        totalTime: state.totalTime
    }
}

//this well set the reducers to props
function mapDispatchToProps(dispatch){
    return bindActionCreators(timeInputActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeInputContainer);

// export default TimeInputContainer;