import React, { useState } from "react";
import './css/login.css';

function Login() {

    const [name, setName] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleUserName = (e) => {
        setName(e.target.value)
    }

    const handlePassword = (e) => {
        setUserPassword(e.target.value)
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            sendLogin()
            console.log("Enter pressed")
        }
    }

    const buttonStyle = {
        color: "#FAF9F9",
        backgroundColor: '#555B6E',
        fontSize: '20px',
        fontFamily: 'Lucida Sans',
        cursor: "pointer"
    };

    // const handleMessage = (e) => {
    //     setMessage(e.target.value)
    // }

    async function sendLogin() {
        const result = await fetch("http://localhost:8080/user/login",
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
        if (result.status === 200) {
            localStorage.setItem("flashyUserName", name)
            localStorage.setItem("flashyToken", parsed.message)
            localStorage.setItem("flashyIsAdmin", parsed.isadmin)
            window.location.href = "/browseFlashy"
        } else {
            setMessage("Wrong username or password :(")
        }
    }

    return (
        <div className = "containerLogin">

            <div className="login">
                <h1>Flashy login</h1>
                <p>Username: <input onKeyDown={handleEnter} onChange={(e)=>handleUserName (e)} type="text"></input></p>
                <p>Password: <input onKeyDown={handleEnter} onChange={(e)=>handlePassword(e)} type={"password"}></input></p>
                <button className="btnLogin"  onClick={() => sendLogin()}>Log in</button>
                <p>{message}</p>
                <a href="/createUser">
                <button className="btnNewUser">Not user yet?</button>
                </a>
            </div>

        </div>

    )
}

export default Login