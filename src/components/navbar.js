import React from "react";
import "./css/navbar.css";

function Navbar(props) {
    return (
        <div className="nav">
            <a href="home">Home</a>
            <a href="profile">Profile</a>
            <a href="createFlashy">Create Flashy</a>
            {localStorage.getItem("flashyIsAdmin") === "1" ? <a href="createAdmin">Admin</a> : null}
            <a href="login">Logout</a>
        </div>
    )
}

export default Navbar;