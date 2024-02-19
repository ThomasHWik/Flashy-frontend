import React from "react";
import "./css/header.css";
import logo from '../assets/images/Flashylogo.png';

function Header(props) {
    return (
        <div className="header">
            <h1>{props.header}</h1>
            <div className="divider">
                <a className="homeLink" href="home">
                    <img className="logo" src={logo} alt="not suppoerted"/>
                </a>
            </div>
        </div>
    )
}

export default Header;