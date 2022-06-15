import React from 'react';

const Error = props => {

    return (
        <div class="ui message" style={{color: "rgb(200,50,50)", backgroundColor: "rgb(256,200,200)"}}>
            <div class="content">
                <div class="header">Error</div>
                <p>
                    {props.message}
                </p>
            </div>
        </div>
    );
};

export default Error;