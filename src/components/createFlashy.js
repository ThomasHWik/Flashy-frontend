import { Checkbox, ToggleButton } from "@mui/material";
import React from "react"
import { useState } from "react"
import "./css/createFlashy.css"

/*Få spørsmålene i rekkefølge i databasen og faktisk legge til input i databasen */

//lagre til array i react
//done sender til databasen med fetch

function CreateFlashy() {
    var questions = []
    const [questionValue, setInputQuestion] = useState('');
    const [answerValue, setInputAnswer] = useState('');
    const [title, setTitle] = useState('');
    function addQ() {
        questions.push({ question: questionValue, answers: answerValue })
        setInputQuestion();
        console.log(questions)
    }
    const handleTitle = (e) => {
        setInputTitle(e.target.value);
    };

    const handleInputQuestion = (e) => {
        setInputQuestion(e.target.value);
    };

    const handleInputAnswer = (e) => {
        setInputAnswer(e.target.value);
    };

    function sendFlashcard() {
        const result = fetch("http://localhost:8080/flashcard/create",
            {
                method: "POST", body: JSON.springfy(
                    { name: title, cards: questions, isprivate: 0 })
            }
        )
        const status=JSON.parse(result)
        console.log(status)
    }
    return (
        <div className="create">
            <p className="title" ><h2>Title: <input onChange={(e) => handleInputTitle(e)} type="text" ></input></h2></p>
            <p className="movetext">
                <h3>Fill in question: <input onChange={(e) => handleInputQuestion(e)} type="text"></input></h3>
                <h3>Fill in answer: <input onChange={(e) => handleInputAnswer(e)} type="text"></input> </h3>
            </p>
            <p>
                <p className="button">
                    <button onClick={() => addQ()}>Add new question</button>
                </p>
                <div className="public">
                    <h3>Press for public carddeck <Checkbox></Checkbox></h3>
                </div>
                <p className="button2">
                    <button onClick={() => sendFlashcard()}>Done</button>
                </p>
            </p>
        </div>
    )


}

export default CreateFlashy;