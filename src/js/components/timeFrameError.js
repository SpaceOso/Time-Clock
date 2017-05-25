import React from 'react';

export const TimeFrameError = (props) => {
        return(
            <div id={`${props.prefix}-error`} className="icon-error">
                <img src="./img/icon-error.svg" alt="error icon"/>
            </div>
        );
};
