import React, { useEffect, useState } from "react";
import "./css/browseFlashy.css";
import Navbar from "./navbar";

function BrowseFlashy() {

    const [allDecks, setAllDecks] = useState([]);

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
            method: "GET",
        }
        );
        console.log(result);
        if (result.status === 200) {
            const decks = await result.json();
            setAllDecks(decks.carddecks);
        } else if (result.status === 500) {
            alert("server error, please try again later.")
        }
        else {
            alert("Please login to view all decks.");
            window.location.href = "/";
        }
    }

    useEffect(() => {
        fetchAllDecks();
    }, []);

    function searchButton(){

    }

    return (
        <div className="browseBody">
            <Navbar />
            <div className="browseContainer">
                <div className="browseOverview">
                    <div className="searchDiv">
                        <input type="textArea" className="searchBar" placeholder="Search here"></input>
                        <button style={{position: 'absolute', right: '15%', top:'40%', blockSize:'50%', fontSize:'80%'}}onClick={() => searchButton()} className="button">Search</button>
                        
                    </div>
                    <div className="browseDiv">
                        <ol>
                        {allDecks.length > 0 ?
                            allDecks.map((v) => (
                            <li><a href={"/quiz?uuid=" + v.uuid}>
                            <div className="allDecksDiv">
                                {v.name}
                            </div>
                            </a></li>)) :

                            <li>No flashies available</li>
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowseFlashy;