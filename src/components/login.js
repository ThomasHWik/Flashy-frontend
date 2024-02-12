import React from "react";
import './css/login.css';

function Login() {

    return (
        <div className="login">
            <h1>Flashy login</h1>
            <p>Username: <input type="text"></input></p>
            <p>Password: <input type="text"></input></p>
            <button>Log in</button>
        </div>
    )
}

export default Login