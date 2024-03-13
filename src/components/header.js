import React, { useState } from "react";
import "./css/header.css";
import logo from '../assets/images/Flashylogo.png';
import DarkMode from "./darkMode";

function Header(props) {
    return (
        <div className="header">
            <h1>{props.header}</h1>
            <div className="divider">
                <a className="homeLink" href="/browseFlashy">
                    <img className="logo" src={logo} alt="not suppoerted"/>
                </a>
            </div>
            <div>
                <p>Dark Mode</p>
                    <DarkMode/>
            </div>
        </div>
    )
}

export default Header;