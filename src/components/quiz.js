import React, {useState} from "react";
import './css/quiz.css';

function Quiz() {

    const buttonStyle = {
        color: "#FAF9F9",
        backgroundColor: '#555B6E',
        fontSize: '20px',
        fontFamily: 'Lucida Sans',
        cursor: "pointer"
    };

    const buttonEmojiStyle = {
        padding: 0,
        border: "#FAF9F9",
        fontSize: "30px",
        background: "#FAF9F9",
        cursor: "pointer"
    }

    function turnCard() {
        var cardText = document.querySelector('.cardText');
        if(cardText.innerHTML === "This is the answer"){
            cardText.innerHTML = "This is the question";
        }
        else{
            cardText.innerHTML = "This is the answer";
        }
    }


    /*

    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const nextCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    */

    return (


    <div>
        <div classname = "container">

            <div className="quizBox" onClick={turnCard}>
                <p className="cardText">This is the question</p>
            </div>

            <div className ="infoBox"> 
                <p>Infobox</p>
                <p>Made by:</p>
                <p>Likes:</p>
                <p>Comments:</p>

            </div>

        </div>

        <div className="divBtn">
            <p className="buttonNext"><button style= {buttonEmojiStyle}>👉</button></p>

            <p className="buttonBack"><button style= {buttonEmojiStyle}>👈</button></p>

            <p className="buttonLike"><button style= {buttonEmojiStyle}>👍</button></p>

            <p className="buttonFavourite"><button style= {buttonEmojiStyle}>🌟</button></p>

            <p className="buttonFlag"><button style= {buttonEmojiStyle}>❗</button></p>
        </div>
    </div>

    )

}


export default Quiz;