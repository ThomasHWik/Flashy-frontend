import React from "react";
import "./css/progressBar.css";
import { useState } from "react";


function ProgressBar(props) {





        return (
            <div className="progressContainer">
                <div className="progressBar" style={{ width: `${100 / props.total * (props.current+1)}%` }} />
            </div>
        );
    
}

export default ProgressBar;