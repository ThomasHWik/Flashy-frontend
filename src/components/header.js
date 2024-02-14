import React from "react";
import "./css/header.css";
import logo from '../assets/images/Flashylogo.png';

function Header(props) {
    return (
        <div className="header">
            <h1><a className="homeLink" href="home">{props.header}</a></h1>
            <img className="logo" src={logo}/>
        </div>
    )
}

export default Header;