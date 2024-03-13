import React, { useEffect, useState } from "react";
import "./css/profile.css";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import CarddeckListElement from "./lists/CarddeckListElement";

function Profile() {
  const [userDecks, setUserDecks] = useState([]);
  const [favoriteDecks, setFavoriteDecks] = useState([]);
  const [popup, setPopup] = useState("");

  // initial toggle pupop hidden
  const [popupVisibility, setPopupVisibility] = useState("hidden");

  // toggle popup visibility
  function togglePopup() {
    setPopupVisibility((prevVisibility) =>
      prevVisibility === "hidden" ? "visible" : "hidden"
    );
  }

  async function fetchUserDecks() {
    const result = await fetch(
      "http://localhost:8080/flashcard/user/" +
      localStorage.getItem("flashyUserName"),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("flashyToken"),
        },
        method: "GET",
      }
    );
    if (result.status === 200) {
      
      const decks = await result.json();
      console.log(decks);
      setUserDecks(decks.carddecks);

    } else {
      alert("Please login to view your decks.");
      window.location.href = "/";
    }
  }

  async function fetchFavoriteDecks() {
    const result = await fetch("http://localhost:8080/flashcard/userfavorites/" + localStorage.getItem("flashyUserName"), {
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("flashyToken"),
      },
      method: "GET",
    });
    console.log(result);
    if (result.status === 200) {
      const decks = await result.json();
      console.log(decks);
      setFavoriteDecks(decks.carddecks);
    } else if (result.status === 500) {
      alert("A server error ocurred");
    } else {
      alert("Please login to view your favorite decks.");
      window.location.href = "/";
    }

  }

  useEffect(() => {
    fetchUserDecks();
    fetchFavoriteDecks();
  }, []);

  return (
    <div className="body">
      <Navbar />
      <div className="containerHome" >
        <div>
        <div className="overview">
          <h1>My Flashies</h1>
          <div className="myFlashy">
            {userDecks.length > 0 ?

              userDecks.map((v) => (
                <CarddeckListElement carddeck={v} />
                )) :


              <p>You have no flashies.</p>
            }
          </div>
        </div>
        <div className="overview">
          <h1>My Favorites</h1>
          <div className="myFlashy">
            {favoriteDecks.length > 0 ?
              favoriteDecks.map((v) => (
                <CarddeckListElement carddeck={v} />

                )) :

              <p>You have no favorites</p>
            }

          </div>
        </div>
        </div>
        <Link to ="/editProfile">
            <button className="editProfileBtn" >Edit Profile</button>
          </Link >
      </div>
      
    </div>

  );
}

export default Profile;
