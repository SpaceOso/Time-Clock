import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { saveTaskName } from '../actions/taskNameAction';


class TaskName extends React.Component{

    handleChange(event){
        let taskName = event.target.value;
        this.props.saveTaskName(taskName);
    }
    
    render(){
        console.log("inside the task name input");
        console.log(this.props);

        return (
            <div id="task-name-container">
                <label className="block">Task Name</label>
                <input type="text"
                       className="form-control"
                       id="task-input"
                       placeholder="Task Name"
                       name="task-name"
                       onChange={event => this.handleChange(event)}
                       required />
            </div>
        )
    }
}

// export default TaskNameInput;
//we are creating our own prop object for this container
function mapStateToProps(state){
    return {
        currentTaskName: state.currentTaskName
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({saveTaskName: saveTaskName}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskName);