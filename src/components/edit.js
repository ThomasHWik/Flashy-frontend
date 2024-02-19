import React from 'react'
import './css/edit.css'

function Edit() {

    const [questions, setBoxCount] = React.useState([]);



    function setCardValue (question, answer, index) {
        let temp = questions;
        temp[index] = [question, answer];
        setBoxCount(temp);
        console.log(temp);
    }

    const Box = (props) => {
        const [question, setQuestion] = React.useState('');
        const [answer, setAnswer] = React.useState('');
        function update() {
            props.updateFunc(question, answer, props.index);
        }

        function updateQuestion(e) {
            setQuestion(e.target.value);
            update();
        }

        function updateAnswer(e) {
            setAnswer(e.target.value);
            update();
        }

        return (
        <div>
            <div className = "box">
                <button className = "create" onClick={() => props.deleteCard(props.index)}>Delete</button>
                <div className='question'>
                    <textarea  rows = {10} cols={52} placeholder='Question' onChange={(e) => updateQuestion(e)}/>
                </div>
                <div className='answer'>
                    <textarea rows = {10} cols={52} placeholder='Answer' onChange={(e) => updateAnswer(e)}/>
                </div>
            </div>
        </div>
        )
    }

    function addCard() {
        console.log(questions)
        setBoxCount([...questions, []]);
    }

    function deleteCard(index){
        let arr = [...questions];
        arr.splice(index, 1);
        setBoxCount(arr)
    }

    const [name, setName] = React.useState([]);

    function updateName(e){
        setName(e.target.value);
    }

    function sendFlashcard() {

        const result = fetch("http://localhost:8080/flashcard/edit",
            {   headers: {"Authorization":"Bearer "+localStorage.getItem("flashyToken")},
                method: "PUT", body: JSON.stringify({ name: name, cards: questions, isprivate: 0, uuid: new URLSearchParams(window.location.search).get("uuid")})
            }
        )
        const status=JSON.parse(result)
        console.log(status)
    }

    return (
        <div className='containerEdit'>
            <div>
                <h1><input onChange={(e) => updateName(e)} placeholder = "Name" style ={{width: "300px", height: "30px", border: "0px", background:"#BEE3DB", borderRadius: "5px"}}></input></h1>
                <h1><button className="doneButton" onClick={() => sendFlashcard()}>Save Flashy</button></h1>
            </div>
            <div className='editHeader'>
                <h1 className='h1Q'>Question</h1>
                <h1 className='h1A'>Answer</h1>
            </div>
            <div className='boxDiv'>
                {questions.map((i, v) => { return <Box updateFunc = {setCardValue} index = {v} deleteCard={deleteCard} /> })}
            </div>
            <div className='addCard' onClick={addCard}>
                <h1>+</h1>
            </div>
        </div>
    )
}

export default Edit;