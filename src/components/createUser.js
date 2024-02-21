import React, { useState } from "react";
import './css/createUser.css';

function CreateUser() {

    const [name, setName] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleUserName = (e) => {
        setName(e.target.value)
    }

    const handlePassword = (e) => {
        setUserPassword(e.target.value)
    }

    async function sendCreateUser() {
        const result = await fetch("http://localhost:8080/user/register",
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST", body: JSON.stringify(
                {username: name, password: userPassword}
            )
        }
        )
        console.log({username: name, password: userPassword})
        console.log(result)
        console.log(result.status)
        const parsed = await result.json()
        console.log(parsed)
        if (result.status == 200) {
            localStorage.setItem("flashyUserName", name)
            localStorage.setItem("flashyToken", parsed.message)
            localStorage.setItem("flashyIsAdmin", parsed.isadmin)
            window.location.href = "/home"
        } else {
            setMessage("Invalid username")
        }
    }

    return (
        <div className="createUser">
            <h1>Create Flashy user</h1>
            <p>Username: <input onChange={(e)=>handleUserName (e)} type="text"></input></p>
            <p>Password: <input onChange={(e)=>handlePassword (e)} type={"password"}></input></p>
            <button onClick={() => sendCreateUser()}>Create User</button>
            <p>{message}</p>
            <a href="/">
                <button>Log in instead</button>
            </a>

        </div>
    )
}

export default CreateUser