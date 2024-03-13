import React, { useEffect, useState } from "react";
import './css/createAdmin.css';
import Navbar from "./navbar";

function CreateAdmin() {

    const [name, setName] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [message, setMessage] = useState("")
    const [adminUsers, setAdminUsers] = useState([])

    const handleUserName = (e) => {
        setName(e.target.value)
    }

    const handlePassword = (e) => {
        setUserPassword(e.target.value)
    }

    const handleEnter = (e) => {
      if (e.key === "Enter") {
          sendCreateAdmin()
          console.log("Enter pressed")
      }
    }

    async function deleteAdmin(adminName){
      const result = await fetch("http://localhost:8080/user/delete/"+adminName,
      {
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " +localStorage.getItem("flashyToken"),
        },
        method: "DELETE"
    })

    if(result.status == 200){
      console.log(result.status)

      fetchAdmins()
    } else {
      alert("You are not authorized to delete admin.")
      window.location.href = "/"
    }
    }

    async function sendCreateAdmin() {
        const result = await fetch("http://localhost:8080/user/admin/create",
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " +localStorage.getItem("flashyToken"),
            },
            method: "POST", body: JSON.stringify(
                {username: name, password: userPassword}
            )
        }
        )
        console.log({username: name, password: userPassword})
        console.log(result)
        if (result.status == 200){
          setMessage("Admin is created");
          await fetchAdmins();
        } else  {
            alert("You are not authorized to create admin.");
            window.location.href = "/";
        }
    }

    async function fetchAdmins() {
      const result = await fetch("http://localhost:8080/user/admin/getall", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " +localStorage.getItem("flashyToken"),
        },
        method: "GET",
      });

      console.log(result)
      if (result.status == 200){
        const admins = await result.json()
        setAdminUsers(admins)
      } else {
        alert("You are not authorized to view admins.");
        window.location.href = "/";
      }
    }

    useEffect(() => {
      fetchAdmins();
    }, []);

  return (
    <div className="adminBody">
      <Navbar />
      <div className="app">
      <div className="admin-panel">
        <div className="current-admin-users">
          <h2>Current admin users</h2>

            {adminUsers.map((v,i) => (
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', position: 'relative'}}>
              <p>{v} <button style={{position: 'absolute', right: '0' }}onClick={() => deleteAdmin(v)} aria-label="Delete">🗑️</button></p>
            </div>
          ))}
            {/* <li> <button aria-label="Delete">🗑️</button></li>
            <li>Admin User 2 <button aria-label="Delete">🗑️</button></li>
            <li>Admin User 3 <button aria-label="Delete">🗑️</button></li> */}
            {/* Add more list items as needed */}

        </div>
        <div className="create-new-admin">
          <h2>Create new admin</h2>
            <label htmlFor="username">Username:</label>
            <input onKeyDown={handleEnter} onChange={(e)=>handleUserName (e)} type="text" id="username" name="username" />
            <label htmlFor="password">Password:</label>
            <input onKeyDown={handleEnter} onChange={(e)=>handlePassword (e)} type="password" id="password" name="password" />
            <button className="btnCreateAdmin" onClick={() => sendCreateAdmin()}>Create Admin</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CreateAdmin

