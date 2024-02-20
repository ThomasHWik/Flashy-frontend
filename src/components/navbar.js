import React from "react";
import "./css/navbar.css";

function Navbar(props) {
    function handleLogout() {
        localStorage.setItem("flashyToken", "");
        localStorage.setItem("flashyUserName", "");
        localStorage.setItem("flashyIsAdmin", "0");

        window.location.href = "/";
    }

    return (
        <div className="nav">
            <a href="home">Home</a>
            <a href="profile">Profile</a>
            <a href="createFlashy">Create Flashy</a>
            <a onClick={() => handleLogout()}>Logout</a>
            {localStorage.getItem("flashyIsAdmin") === "1" ?
                <a href="admin">Admin</a>: null
            }
        </div>
    )
}

export default Navbar;