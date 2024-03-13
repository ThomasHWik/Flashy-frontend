
import Navbar from "./navbar";
import "./css/publicprofile.css";
import React, { useEffect } from "react";
import CarddeckListElement from "./lists/CarddeckListElement";

const PublicProfile = () => {

    const [userDecks, setUserDecks] = React.useState([]);
    const username = new URLSearchParams(window.location.search).get("u");

    async function fetchUserDecks() {
        const result = await fetch(
            "http://localhost:8080/flashcard/user/" + username,
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
            
            setUserDecks(decks.carddecks.filter((deck) => deck.isprivate === 0));

        } else if (result.status === 500) {
            alert("A server error ocurred");
            window.location.href = "/profile";
        } else {
            alert("User not found");
            window.location.href = "/profile";
        }

    }

    useEffect(() => {
        fetchUserDecks();
    }, []);

    return (
        <div className="body">
            <Navbar />
            <div className="containerPubProf" >
                <div className="pubprof_header">
                    <h1><span>@ </span>{username}</h1>
                </div>
                <div className="pubprof_statheader">
                    <span>Community statistics</span>
                </div>
                <div className="pubprof_stats">
                      
                        <p>Public flashcards: {userDecks.length}</p>
                        <p>Total likes: {
                            userDecks.reduce((a, b) => a + b.likecount, 0)
                        }
                        </p>
                        <p>Total favorites: {
                            userDecks.reduce((a, b) => a + b.favoritecount, 0)
                        }
                        </p>
                 
        
                </div>
                <div className="pubprof_decks">
                    <p>Public flashcards</p>
                    <div className="myFlashy">
                        {userDecks.length > 0 ?

                            userDecks.map((v) => (
                                <CarddeckListElement carddeck={v} />
                            )) :

                            <p>This user does not have any public flashcards.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PublicProfile;