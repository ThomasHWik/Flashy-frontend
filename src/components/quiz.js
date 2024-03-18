import React, { useEffect, useState } from "react";
import "./css/quiz.css";
import Navbar from "./navbar";
import ProgressBar from "./progressBar";
import CommentSection from "./commentSection";

import { FaStar } from "react-icons/fa";
import { FcLike } from "react-icons/fc";


function Quiz() {
  const [deck, setDeck] = useState({
    name: "",
    cards: [{ question: "", answer: "" }],
    tags: [],
  });


  const [currImage, setCurrImage] = useState("");
  const [showAnswer, setShowAnswer] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const [loadingDelete, setLoadingDelete] = useState(false);

  const queryParameters = new URLSearchParams(window.location.search);
  const uuid = queryParameters.get("uuid");

  const [isFavorite, setIsFavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [likes, setLikes] = useState(0);
  const [favorites, setFavorites] = useState(0);


  function markAsDifficult() {
    setDeck((currentDeck) => {
      const currentCard = currentDeck.cards[currentCardIndex];
      let newList = [...currentDeck.cards, currentCard];
      return { ...currentDeck, cards: newList};
      });
      setShowAnswer(0);
  }

  async function fetchFlashyInfo() {
    const result = await fetch("http://localhost:8080/flashcard/id/" + uuid, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "bearer " + localStorage.getItem("flashyToken"),
      },
      method: "GET",
    });
    console.log(result);
    if (result.status === 200) {
    const decks = await result.json();
    console.log(decks);
    setDeck(decks);

    setIsFavorite(decks.isfavorited);
    setIsLiked(decks.isliked);
    setLikes(decks.likecount);
    setFavorites(decks.favoritecount);

    let cardcopy = [];
    // get images
    for (let i = 0; i < decks.cards.length; i++) {
      let card= decks.cards[i];
      if (card.imagequestion != null) {
        const qimage = await getImage(card.uuid, "q");
        card.qimage = qimage;
      }
      if (card.imageanswer != null) {
      const aimage = await getImage(card.uuid, "a");
      card.aimage = aimage;
      }
      cardcopy.push(card);
      setDeck((currentDeck) => {
        return { ...currentDeck, cards: cardcopy };
      });
    }
    } else {
      alert("You are not authorized to view this deck.");
      window.location.href = "/";
    }
  }



  async function getImage(uuid, type) {
    console.log("http://localhost:8080/image/" + uuid + "__" + type);
    let res = await fetch("http://localhost:8080/image/" + uuid + "__" + type);
    if (res.status === 200) {
     
      let base64String = await res.text();

      const imageSrc = `${base64String}`;
  
   
      return imageSrc;
    } else {
      return "";
    }
    
    
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

  function endOfDeck() {
    setCurrentCardIndex(deck.cards.length - 1);
    setShowAnswer(0);
  }

  function previousCard() {
    if (currentCardIndex == 0) {
      return;
    }
    setCurrentCardIndex((currentCardIndex - 1) % deck.cards.length);
    setShowAnswer(0);
  }

  async function favoriteDeck() {
    console.log(uuid);
    if (!isFavorite) {
      const result = await fetch(
        "http://localhost:8080/flashcard/favorite/add/" + uuid,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + localStorage.getItem("flashyToken"),
          },
          method: "POST",
        }
      );
      console.log(result);
        if (result.status === 200) {
        setIsFavorite(true);
        setFavorites(favorites + 1);
      }
        else{
          alert("An error occurred. Please try again.");
        }
     
    }
    else{
      const result = await fetch(
        "http://localhost:8080/flashcard/favorite/remove/" + uuid,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + localStorage.getItem("flashyToken"),
          },
          method: "DELETE",
        }
      );
      if (result.status === 200) {
       
        setIsFavorite(false);
        setFavorites(favorites - 1);

      } else {
        alert("An error occurred. Please try again.");
      }
    }
  }
  async function likeDeck() {
    if (!isLiked) {
      const result = await fetch(
        "http://localhost:8080/flashcard/like/add/" + uuid,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + localStorage.getItem("flashyToken"),
          },
          method: "POST",
        });
      console.log(result);
      if (result.status === 200) {
        setIsLiked(true);
        setLikes(likes + 1);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
    else{
      const result = await fetch(
        "http://localhost:8080/flashcard/like/remove/" + uuid,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + localStorage.getItem("flashyToken"),
          },
          method: "DELETE",
        });
      if (result.status === 200) {
        setIsLiked(false);
        setLikes(likes - 1);
      }
      else {
        alert("An error occurred. Please try again.");
      }
    }
  }


  function startOfDeck() {
    setCurrentCardIndex(0);
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
      window.location.href = "/profile";
    } else if (result.status === 403) {
      alert("You are not authorized to delete this deck. Please log in as an authorized user.");
      window.location.href = "/";
    } else {
      alert("An error occurred. Please try again.");
    }
  }

  function checkAuthorization(username, isEditable) {
    return localStorage.getItem("flashyUserName") === username || localStorage.getItem("flashyIsAdmin") == "1" || isEditable == "1";
  }

  function getImageElement() {
    if (showAnswer) {
      if (deck.cards[currentCardIndex].imageanswer != null) {
        return <img src={deck.cards[currentCardIndex].aimage} alt="" className="quiz_flashcardimage" />;
      } 
    } 
    else {
      if (deck.cards[currentCardIndex].imagequestion != null) {
        return <img src={deck.cards[currentCardIndex].qimage} alt="" className="quiz_flashcardimage" />;
      }
    }

    return null;
  }


  useEffect(() => {
    fetchFlashyInfo();
  }, []);

  const buttonStyle = {
    color: "#FAF9F9",
    backgroundColor: "transparent",
    fontSize: "20px",
    fontFamily: "Lucida Sans",
    cursor: "pointer",
  };

  const buttonEmojiStyle = {
    padding: 0,
    border: "#FAF9F9",
    fontSize: "30px",
    background: "transparent",
    cursor: "pointer",
  };

  const buttonFlagStyle = {
    padding: 10,
    border: "#FAF9F9",
    fontSize: "30px",
    background: "#bee3db",
    cursor: "pointer",
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 3,
  };

  /* LIKE, FAV og FLAG buttons


  */

    return (
      <div className="quizBody">
        <Navbar />
        <div className="containerQuiz">
          <ProgressBar current={currentCardIndex} total={deck.cards.length} />
          <div className="gamecontainer">
            <div className="infoBox">
              <p style={{fontWeight: "bold"}}>{deck.name}</p>
              <p>Made by: <span style={{ fontWeight: "bold" }}><a style={{color: "black", textDecoration: "none"}} href={"/publicprofile?u="+deck.username}>@{deck.username}</a></span></p>
              <p>Cards: <span style={{ fontWeight: "bold" }}>{deck.cards.length}</span></p>
              <p>Likes: <span style={{ fontWeight: "bold" }}>{likes}</span></p>
              <p>Favorites: <span style={{ fontWeight: "bold" }}>{favorites}</span></p>
              <div className="quiz_tagscontainer" style={{display:"flex", flexWrap:"wrap"}}>
             {deck.tags.map((tag, index) => (
                  <span className="quiz_tags" key={index}>{tag}</span>
                ))}

              </div>
              <div className="deleteeditcontainer">
                {checkAuthorization(deck.username, deck.iseditable) ?
                  <button className="button" onClick={() => editDeck()}>Edit</button>
                  : null
                }
                {(checkAuthorization() || localStorage.getItem("flashyUserName") === deck.username) ? <button className="button" onClick={() => deleteDeck()}>Delete</button> : <></>}

            </div>
          </div>

          <div className="quizBox" onClick={() => setShowAnswer(!showAnswer)}>
            <p>
              <button style={buttonFlagStyle} onClick={(e) => {e.stopPropagation(); markAsDifficult();}}>
              ❗
              </button>
            </p>

            <p className="cardText">
              <span>#{currentCardIndex+1}</span>
            {deck.cards.length > 0 ? getImageElement() : null}
            
              {deck.cards.length > 0 ? showAnswer
                ? deck.cards[currentCardIndex].answer
                : deck.cards[currentCardIndex].question : "This deck is empty"
              }
            </p>
          </div>
        </div>

        <div className="divBtn">
            <button style={buttonEmojiStyle} onClick={() => startOfDeck()}>⏮️</button>

            <button style={buttonEmojiStyle} onClick={() => previousCard()}>
              ⬅️
            </button>

            <div className={!isLiked ? "outline-iconheart" : ""}>
              <FcLike cursor={"pointer"} size={30}   onClick={() => likeDeck()} />
            </div>
  
            <button style={buttonEmojiStyle} onClick={() => shuffleDeck()}>
              🔃
            </button>
        
            <div className={!isFavorite ? "outline-iconstar" : ""}>
            <FaStar cursor={"pointer"}  size={30} color={isFavorite ? "#E3C565" : "gray"}   onClick={() => favoriteDeck()} />
            </div>

            <button disabled={loadingDelete} style={buttonEmojiStyle} onClick={() => nextCard()}>➡️</button>

            <button disabled={loadingDelete} style={buttonEmojiStyle} onClick={() => endOfDeck()}>⏭️</button>
        </div>
        <CommentSection/>
      </div>

    </div>
  );
}



export default Quiz;
