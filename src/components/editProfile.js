import React, { useState } from "react";
import "./css/editProfile.css";
import Navbar from "./navbar";

function EditProfile() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleUserName = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    async function sendUser() {
        const result = await fetch("http://localhost:8080/user/change",
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("flashyToken"),
            },
            method: "POST", body: JSON.stringify(
                {username: username, password: password}
            )
        }
        )
        console.log(result)
        console.log(result.status)
        const parsed = await result.json()
        console.log(parsed)
        if (result.status == 200) {
            localStorage.setItem("flashyUserName", username)
            localStorage.setItem("flashyToken", parsed.message)
            localStorage.setItem("flashyIsAdmin", parsed.isadmin)
            window.location.href = "/home"
        } else {
            setMessage("Invalid username")
        }
    }

    return (
        <div className="editProfileBody">
            <Navbar/>
            <div className="changeProfile">
                <div className="changeUsername">
                    <label>
                        Change Username:
                        <br></br>
                        <br></br>    
                        <input type="text" placeholder="Enter new username" onChange={(e)=>handleUserName (e)} ></input>
                    </label>
                </div>
                <div className="changePassword">
                    <label>
                        Change Password:  
                        <br></br>
                        <br></br>
                        <input type="text" placeholder="Enter new password" value={password} onChange={(e)=>handlePassword (e)}></input>                    </label>
                </div>
                <button className="saveChangesButton" value={password} onClick={() => sendUser()}>Save changes</button>
            </div>
        </div>
    )
}

export default EditProfile;