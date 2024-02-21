import React, { useEffect } from 'react'
import './css/edit.css'
import { Checkbox } from "@mui/material";
import Navbar from './navbar'

function CreateFlashy() {

    const [questions, setQuestions] = React.useState([]);

    const [disableConfirm, setDisableConfirm] = React.useState(false);

    const [username, setUsername] = React.useState("");

    const [isPrivate, setIsPrivate] = React.useState(false);


    const uuid = new URLSearchParams(window.location.search).get("uuid");

    function handleIsPrivate(e) {
        setIsPrivate(e.target.checked);

    }

    function setCardValue(question, answer, index) {
        let temp = questions;
        temp[index] = [question, answer];
        setQuestions(temp);
        console.log(temp);
    }

    function getValues(index) {
        return questions[index];
    }

    function addCard() {
        console.log(questions)
        setQuestions([...questions, []]);
    }

    function deleteCard(index) {
        let temp = [...questions];
        temp.splice(index, 1);
        setQuestions(temp);
    }

    const [name, setName] = React.useState([]);

    function updateName(e) {
        setName(e.target.value);
    }

    async function confirmCreate() {
        setDisableConfirm(true);
        let cards = [];
            questions.forEach((card) => {
                cards.push({ question: card[0], answer: card[1]});
            });

        const result = await fetch("http://localhost:8080/flashcard/create",
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("flashyToken"),
                    "Content-Type": "application/json"
                },
                method: "POST", body: JSON.stringify({ name: name, cards: cards, isprivate: isPrivate ? 1 : 0 })
            }
        )
        const status = result.status;
        console.log(result)

        if (status === 200) {
            window.location.href = "/home"
        } else if (status === 403) {
            alert("You are not authorized to create flashcard.");
        }
        else {
            alert("An error occurred. Please try again.");
        }
        setDisableConfirm(false);
    }


    return (
        <div className='editcontainer'>
            <Navbar />
            <div className='editmaincontainer'>
                <p>Create Flashcard</p>
                <div className='editsectioncontainer'>
                    <p>Information</p>
                    <div className='editheadercontainer'>
                        <div>
                            <p>Title</p>
                            <input onChange={(e) => updateName(e)} placeholder='Title' value={name}></input>
                        </div>
                       
                            <div>
                                <p>Set private</p>
                                <Checkbox onChange={(e) => { handleIsPrivate(e) }} value={isPrivate}></Checkbox>
                            </div>
                          
                        

                    </div>
                </div>
    
                <div className='editsectioncontainer'>
                    <p>Flashcards</p>
                    <div className='editboxescontainer'>
                        {questions.map((i, v) => { return <Box key={v} question={i[0]} getValues={getValues} answer={i[1]} updateFunc={setCardValue} index={v} deleteCard={deleteCard} /> })}
                        <div className='editaddCard' onClick={addCard}>
                            <h3 className="editaddcardbtn">+</h3>
                        </div>
                    </div>

                </div>
                <div className='confirmeditcontainer'>
                    <button disabled={disableConfirm} onClick={() => confirmCreate()}>Create</button>
                </div>
            </div>
        </div>
    )
}

const Box = (props) => {
    const [question, setQuestion] = React.useState(props.question || '');
    const [answer, setAnswer] = React.useState(props.answer || '');


    useEffect(() => {
        setQuestion(props.question || '');
        setAnswer(props.answer || '');
    }, [props.question, props.answer]);


    function update(question, answer) {
        props.updateFunc(question, answer, props.index);
    }

    function updateQuestion(e) {
    
        setQuestion(e.target.value);
        update(e.target.value, answer);
    }

    function updateAnswer(e) {

        setAnswer(e.target.value);
        update(question, e.target.value);
    }

    return (
        <div>
            <div className="box">
                <button className="editdeletecardbtn" onClick={() => props.deleteCard(props.index)}>Delete</button>
                <div className='question'>
                    <textarea rows={10} placeholder='Question' onInput={(e) => updateQuestion(e)} value={question} />
                </div>
                <div className='editverticalline'></div>
                <div className='answer'>
                    <textarea rows={10} placeholder='Answer' onInput={(e) => updateAnswer(e)} value={answer} />
                </div>
            </div>
        </div>
    )
}

export default CreateFlashy;
