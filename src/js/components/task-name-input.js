import React from 'react';

class TaskNameInput extends React.Component{
    render(){
        return (
            <div id="task-name-container">
                <label className="block">Task Name</label>
                <input type="text"
                       className="form-control"
                       id="task-input"
                       placeholder="Task Name"
                       name="task-name"
                       required />
            </div>
        )
    }
}

export default TaskNameInput;