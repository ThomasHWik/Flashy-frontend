import React, { useEffect, useState } from "react";
import { createTheme } from "styled-theming";
import "./css/header.css";

const DarkMode = () => {

    const [isDarkMode, setIsDarkMode] = useState(true);


    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
        localStorage.setItem("selectedTheme", "dark");
        <div className='slider'></div>

    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light')
        localStorage.setItem("selectedTheme", "light")
    }
    

    const selectedTheme = localStorage.getItem("selectedTheme");
    useEffect(() => {

        if (selectedTheme === "dark") {
            setIsDarkMode(true);
            setDarkMode();
        }
        else {
            setIsDarkMode(false);
            setLightMode();
        }

    })

    const toggleTheme = (e) => {
        setIsDarkMode(e.target.checked);
        const body = document.querySelector("body");

        if (e.target.checked) {
            setDarkMode();
            body.classList.add("dark-mode");
        }
        else {
            setLightMode();
            body.classList.add("dark-mode");
        }
    }


    return (

        <label className='switch'>
            <input type='checkbox' onChange={(e) => { toggleTheme(e) }}
                checked={isDarkMode}
            ></input>
            <span className='slider'></span>

        </label>
    )
}

export default DarkMode;

