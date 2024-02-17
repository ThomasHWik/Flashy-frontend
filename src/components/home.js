import React, { useEffect, useState } from "react";
import "./css/home.css";

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
    <div>
      <div className="container" href="createFlashy">
        <h1>My Flashies</h1>
        <div className="myFlashy">
          {userDecks.map((v) => (
            <div onClick={() => togglePopup()}>
              <a href={"/quiz?uuid=" + v.uuid}>{v.name}</a>
            </div>
          ))}
        </div>
        <h1>My favorites</h1>
        <div className="favFlashy">
          {favoriteDecks.map((v) => (
            <div onClick={() => togglePopup()}>
              <a href={"/quiz?uuid=" + v.uuid}>{v.name}</a>
            </div>
          ))}
        </div>
        <a className="createFlashy" href="createFlashy">
          <div>
            <h1>Create New Flashy!</h1>
          </div>
        </a>
        <a className="createAdmin" href="createAdmin">
          <div>
            <h1>Create New Admin!</h1>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Home;
