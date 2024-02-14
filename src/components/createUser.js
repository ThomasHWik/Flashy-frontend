import React from "react";
import './css/createUser.css';

function CreateUser() {

    return (
        <div className="createUser">
            <h1>Create Flashy user</h1>
            <p>Username: <input type="text"></input></p>
            <p>Password: <input type="text"></input></p>
            <button>Create User</button>
            <a href="/login">
                <button>Log in instead</button>
            </a>

        </div>
    )
}

export default CreateUser