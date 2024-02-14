import { Checkbox, ToggleButton } from "@mui/material";
import React from "react"
import { useState } from "react"
import "./css/createFlashy.css"

//fjerne input når kort er lagt inn
//design?
//checkbox med database

function CreateFlashy() {
    const buttonStyle = {
        backgroundColor: "#ffd6ba",
        borderRadius: "5px",
        fontFamily: 'Lucida Sans',
        cursor: "pointer"
    }



    var questions = []
    const [questionValue, setInputQuestion] = useState('');
    const [answerValue, setInputAnswer] = useState('');
    const [title, setInputTitle] = useState('');
    function addQ() {
        questions.push({ question: questionValue, answers: answerValue })
        setInputQuestion();
        console.log(questions)
    }
    const handleInputTitle = (e) => {
        setInputTitle(e.target.value);
    };

    const handleInputQuestion = (e) => {
        setInputQuestion(e.target.value);
    };

    const handleInputAnswer = (e) => {
        setInputAnswer(e.target.value);
    };

    async function sendFlashcard() {
        const result = await fetch("http://localhost:8080/flashcard/create",
            {
                method: "POST", mode: "cors", credentials: "same-origin", body: JSON.stringify(
                    { name: title, cards: questions, isprivate: 0 })
            }
        )
        const status=JSON.parse(result)
        console.log(status)
    }
    return (
        <div className="create">
            <p className="movetext" ><h2>Title: </h2>
                <textarea className="textboxes" cols={80} onChange={(e) => handleInputTitle(e)} type="text" ></textarea>
            </p>
            <h3 className="movetext">Press for public carddeck <Checkbox></Checkbox></h3>
            <p className="movetext">
                <h3>Fill in question: </h3>
                <textarea className="textboxes"  cols={80} onChange={(e) => handleInputQuestion(e)} type="text"></textarea>
                <h3>Fill in answer:</h3>
                <textarea className="textboxes" rows={15} cols={80}
                                        onChange={(e) => handleInputAnswer(e)} type="text"></textarea>
            </p>
            <p>
                <p className="button">
                    <button style={buttonStyle} onClick={() => addQ()} >Add new question</button>
                </p>
                <div className="public">
            
                </div>
                <p className="button">
                    <button style={buttonStyle} onClick={() => sendFlashcard()}>Save deck</button>
                </p>
            </p>
        </div>
    )


}

export default CreateFlashy;