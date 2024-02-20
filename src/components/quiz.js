import React, { useEffect, useState } from "react";
import "./css/quiz.css";
import Navbar from "./navbar";

function Quiz() {
  const [deck, setDeck] = useState({
    name: "",
    cards: [{ question: "", answer: "" }],
  });

  const [showAnswer, setShowAnswer] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const [loadingDelete, setLoadingDelete] = useState(false);

  const queryParameters = new URLSearchParams(window.location.search);
  const uuid = queryParameters.get("uuid");

  useEffect(() => {
    console.log("Cards in deck:", deck.cards);
  }, [deck.cards]); // logs changes to card deck (such as loading and shuffling)


  async function fetchFlashyInfo() {
    const result = await fetch("http://localhost:8080/flashcard/id/" + uuid, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "bearer " + localStorage.getItem("flashyToken"),
      },
      method: "GET",
    });
    console.log(result);
    const decks = await result.json();
    console.log(decks);
    setDeck(decks);
  }

  // shuffle the flashcard deck
  function shuffleDeck() {
    setDeck((currentDeck) => {
      let shuffledDeck = [...deck.cards]; // copy of the cards array
      for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]]; // swap cards
      }
      return { ...currentDeck, cards: shuffledDeck }; // return a new deck with the shuffled cards
    });

    setCurrentCardIndex(0); // start the quiz at the first card
    setShowAnswer(0); // show the question side of the flashcard
  }

  function nextCard() {
    setCurrentCardIndex((currentCardIndex + 1) % deck.cards.length);
    setShowAnswer(0);
  }

  function previousCard() {
    if (currentCardIndex == 0) {
      return;
    }
    setCurrentCardIndex((currentCardIndex - 1) % deck.cards.length);
    setShowAnswer(0);
  }

  function editDeck() {
    window.location.href = "/edit?uuid=" + uuid;
  }

  async function deleteDeck() {

    setLoadingDelete(true);
    const result = await fetch("http://localhost:8080/flashcard/delete/" + uuid, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "bearer " + localStorage.getItem("flashyToken"),
      },
      method: "DELETE",
    });


    if (result.status === 200) {
      window.location.href = "/home";
    } else if (result.status === 403) {
      alert("You are not authorized to delete this deck.");
    } else {
      alert("An error occurred. Please try again.");
    }


  }


  function checkAuthorization(username) {
    return localStorage.getItem("flashyUserName") === deck.username || localStorage.getItem("flashyIsAdmin") === "1";
  }

  useEffect(() => {
    fetchFlashyInfo();
  }, []);

  const buttonStyle = {
    color: "#FAF9F9",
    backgroundColor: "#555B6E",
    fontSize: "20px",
    fontFamily: "Lucida Sans",
    cursor: "pointer",
  };

  const buttonEmojiStyle = {
    padding: 0,
    border: "#FAF9F9",
    fontSize: "30px",
    background: "#555B6E",
    cursor: "pointer",
  };

  return (
    <div className="quizBody">
      <Navbar />
      <div className="containerQuiz">
        <div className="gamecontainer">
          <div className="infoBox">
            <h3>{deck.name}</h3>
            <p>Made by: <span style={{ fontWeight: "bold" }}>{deck.username}</span></p>
            <p>Cards: <span style={{ fontWeight: "bold" }}>{deck.cards.length}</span></p>
            <div className="deleteeditcontainer">
              <button onClick={() => editDeck()} className="button">Edit</button>
              {checkAuthorization() ? <button className="button" onClick={() => deleteDeck()}>Delete</button> : <></>}

            </div>
          </div>
          <div className="quizBox" onClick={() => setShowAnswer(!showAnswer)}>
            <p className="cardText">
              <span>#{currentCardIndex+1}</span>
              {deck.cards.length > 0 ? showAnswer
                ? deck.cards[currentCardIndex].answer
                : deck.cards[currentCardIndex].question : "This deck is empty"
              }
            </p>
          </div>
        </div>


        <div className="divBtn">
          <p className="buttonBack">
            <button style={buttonEmojiStyle} onClick={() => previousCard()}>
              👈
            </button>
          </p>

          <p className="buttonFavourite">
            <button style={buttonEmojiStyle}>🌟</button>
          </p>

          <p className="buttonShuffle">
            <button style={buttonEmojiStyle} onClick={() => shuffleDeck()}>
              🔃
            </button>
          </p>

          <p className="buttonFlag">
            <button style={buttonEmojiStyle}>❗</button>
          </p>

          <p className="buttonLike">
            <button style={buttonEmojiStyle}>👍</button>
          </p>

          <p className="buttonNext">
            <button disabled={loadingDelete} style={buttonEmojiStyle} onClick={() => nextCard()}>
              👉
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Quiz;
