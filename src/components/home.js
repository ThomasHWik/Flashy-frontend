import React, { useEffect, useState } from "react";
import "./css/home.css";
import Navbar from "./navbar";

function Home() {
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
    console.log(result);
    const decks = await result.json();
    setUserDecks(decks.carddecks);
    console.log(decks);
  }

  async function fetchFavoriteDecks() {
    const result = await fetch("http://localhost:8080/flashcard/favorites", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    console.log(result);
    const decks = await result.json();
    setUserDecks(decks.carddecks);
    console.log(decks);
  }

  useEffect(() => {
    fetchUserDecks();
    // fetchFavoriteDecks();
  }, []);

  return (
    <div className="body">
      <Navbar />
      <div className="container" href="createFlashy">
        <div className="overview">
          <h1>My Flashies</h1>
          <div className="myFlashy">
            {userDecks.map((v) => (
              <div onClick={() => togglePopup()}>
                <a href={"/quiz?uuid=" + v.uuid}>{v.name}</a>
              </div>
            ))}
          </div>
        </div>
        <div className="overview">
          <h1>My Favorites</h1>
          <div className="favFlashy">
            {favoriteDecks.map((v) => (
              <div onClick={() => togglePopup()}>
                <a href={"/quiz?uuid=" + v.uuid}>{v.name}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
