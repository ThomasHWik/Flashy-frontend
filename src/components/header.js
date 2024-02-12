import React from "react";
import "./css/header.css";

function Header(props) {
    return (
        <div className="header">
            <h1><a className="homeLink" href="user.html">{props.header}</a></h1>
        </div>
    )
}

export default Header;