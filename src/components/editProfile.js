import React, { useState } from "react";
import "./css/editProfile.css";
import Navbar from "./navbar";

function EditProfile() {

    const [username, setUsername] = useState(localStorage.getItem("flashyUserName"));
    const [password, setPassword] = useState("");

    const handleUserName = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }


    async function deleteAccount() {
        const result = await fetch("http://localhost:8080/user/delete/" + localStorage.getItem("flashyUserName"),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + localStorage.getItem("flashyToken"),
                },
                method: "DELETE"
            }
        )


        if (result.status == 200) {
            localStorage.removeItem("flashyUserName")
            localStorage.removeItem("flashyToken")
            localStorage.removeItem("flashyIsAdmin")
            window.location.href = "/"
        } else {
            alert("Something went wrong.")

    
    }
}
    const handleEnter = (e) => {
        if (e.key === "Enter") {
            sendUser()
            console.log("Enter pressed")

        }
    }

    async function sendUser() {
        
        const data = {
            "username": username,
            "password": password
        }


        console.log(data)

        const result = await fetch("http://localhost:8080/user/change/" + localStorage.getItem("flashyUserName"),
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("flashyToken"),
            },
            method: "PUT", body: JSON.stringify(
                data
            )
        }
        )
        console.log(result)

        if (result.status == 200) {
            const parsed = await result.json();
            localStorage.setItem("flashyUserName", username)
            localStorage.setItem("flashyToken", parsed.message)
            localStorage.setItem("flashyIsAdmin", parsed.isadmin)
            window.location.href = "/profile"
        } else {
            alert("Invalid username or password")
        }
    }

    return (
        <div className="editProfileBody">
            <Navbar/>
            <div className="editprofilecontainer">
            <div className="changeProfile">
                
                <div className="changeUsername">
                    <label>
                        Change Username:
                        <br></br>
                        <br></br>    
                        <input className="inputChangeAdmin" onKeyDown={handleEnter} type="text" value={username} placeholder="Enter new username" onChange={(e)=>handleUserName (e)} ></input>
                    </label>
                </div>

                <div className="changePassword">
                    <label>
                        Change Password:  
                        <br></br>
                        <br></br>
                        <input className="inputChangeAdmin" onKeyDown={handleEnter} type="text" placeholder="Enter new password" value={password} onChange={(e)=>handlePassword (e)}></input>                    </label>
                </div>
                <button className="saveChangesButton" value={password} onClick={() => sendUser()}>Save changes</button>
           
                <button onClick={() => deleteAccount()} className="deleteaccountbtn">Delete account</button>
            </div>
           
         
        </div>
    </div>
    )
}

export default EditProfile;