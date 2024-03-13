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
            <a href="createFlashy">Create Flashy</a>
            <a href="browseFlashy">Browse Flashy</a>
            <a href="profile">Profile</a>



            {localStorage.getItem("flashyIsAdmin") === "1" ?
                <a href="createAdmin">Admin</a>: null
            }
            <a onClick={() => handleLogout()}>Logout</a>
        </div>
    )
}

export default Navbar;