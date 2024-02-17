import { Checkbox, ToggleButton } from "@mui/material";
import React from "react"
import { useState } from "react"
import "./css/createFlashy.css"
import { useTheme } from "@emotion/react";

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



    const [questions, setQuestions] = useState([]);
    const [questionValue, setInputQuestion] = useState('');
    const [answerValue, setInputAnswer] = useState('');
    const [title, setInputTitle] = useState('');
    const [isPrivate, setIsPrivate] = useState(0);

    function addQ() {
        setQuestions([...questions,{question:questionValue, answer:answerValue}])
        setInputQuestion();
        console.log(questions)
    }

    const handleIsPrivate = (e) => {
        setIsPrivate(e.target.value)
    }
    ;
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

                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST", body: JSON.stringify(
                    { name: title, cards: questions, isprivate: 0 })
            }
        )
        console.log(result)
    }
    return (
        <div className="create">
            <p className="movetext" ><h2>Title: </h2>
                <textarea className="textboxes" cols={80} onChange={(e) => handleInputTitle(e)} type="text" ></textarea>
            </p>
            <h3 className="movetext">Press for public carddeck <Checkbox onChange={(e)=> handleIsPrivate(e)}></Checkbox></h3>
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