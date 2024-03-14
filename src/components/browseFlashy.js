import React, { useEffect, useState } from "react";
import "./css/browseFlashy.css";
import Navbar from "./navbar";
import { IoMdSearch } from "react-icons/io";
import TagSearch from "./misc/TagSearch";
import FullSearch from "./misc/FullSearch";
import CarddeckListElement from "./lists/CarddeckListElement";



function BrowseFlashy() {

    const [allDecks, setAllDecks] = useState([]);

    const [resultheader, setResultheader] = useState("Popular carddecks");


    const searchButtonStyle = {
        color: "#FAF9F9",
        backgroundColor: "#555B6E",
        fontSize: "20px",
        fontFamily: "Lucida Sans",
        cursor: "pointer",
    };

    async function fetchAllDecks() {
        const result = await fetch(
            "http://localhost:8080/flashcard/all/0/100/likedesc",
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + localStorage.getItem("flashyToken"),
            },
            method: "GET"
        }
        );
        console.log(result);
        if (result.status === 200) {
            const decks = await result.json();
            setAllDecks(decks.carddecks);
        } else if (result.status === 500) {
            alert("server error, please try again later.")
        }
        
    }

    useEffect(() => {
        fetchAllDecks();
    }, []);
    
    const handleSearch = async (title, tags, orderby) => {
        let url = "http://localhost:8080/flashcard/search/0/100/" + orderby;
        const result = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + localStorage.getItem("flashyToken"),
            },
            method: "POST",
            body: JSON.stringify({ searchquery: title, tags: tags }),
        });
        if (result.status === 200) {
            const decks = await result.json();
            console.log(decks);
            setAllDecks(decks.carddecks);
            setResultheader("Search results (" + decks.carddecks.length + ")");
        } else if (result.status === 500) {
            alert("server error, please try again later.")
        } else {
            alert("An unknown error occurred.")
        }
    }


    return (
        <div className="browseBody">
            <Navbar />
            <div className="browseContainer">
                <div className="browseOverview">
                    <FullSearch onsearch={handleSearch} />
                    
                        <h1 className="browse_resultheader">{resultheader}</h1>
                        {
                    <div className="browseDiv">
                        
                        
                        {allDecks.length > 0 ?
                            allDecks.map((v) => (
                                <CarddeckListElement key={v.uuid} carddeck={v} />
                            ))
                             :
                                <p>No carddecks found</p>
                            
                            }
                        
                       
                    </div>
                     }
                </div>
            </div>
        </div>
    )
}



export default BrowseFlashy;