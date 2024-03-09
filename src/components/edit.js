import React, { useEffect } from 'react'
import './css/edit.css'
import Navbar from './navbar'
import TagSearch from './misc/TagSearch'
import { IoIosRemoveCircle } from "react-icons/io";
import './css/tagsearch.css';

function Edit() {

    const [questions, setQuestions] = React.useState([]);

    const [initialDeck, setInitialDeck] = React.useState({
        name: "Hovedstader",
        cards: [],
        isprivate: 0,
        uuid: "wefkweofp"
    });

    const [disableConfirm, setDisableConfirm] = React.useState(false);

    const [tags, setTags] = React.useState([]);



    const [username, setUsername] = React.useState("");

    const [isPrivate, setIsPrivate] = React.useState(false);


    const uuid = new URLSearchParams(window.location.search).get("uuid");

    function handleaddtag(tag) {
        if (tags.indexOf(tag) !== -1) {
            return;
        } else {
            setTags([...tags, tag]);
        }
    }

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

    function checkAuthorization(deckusername) {
        return localStorage.getItem("flashyIsAdmin") === "1" || localStorage.getItem("flashyUserName") === deckusername;
    }

    function updateName(e) {
        setName(e.target.value);
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

            const deck = await result.json();
            setName(deck.name);
            let cards = [];
            deck.cards.forEach((card) => {
                cards.push([card.question, card.answer]);
            });
            console.log(deck);
            setQuestions(cards);
            setInitialDeck(deck);
            setIsPrivate(deck.isprivate);
            setTags(deck.tags);

        } else {
            alert("Failed to fetch flashcard / You are not authorized to edit this flashcard.");
            window.location.href = "/";
        }

    }

    async function confirmEdit() {
        setDisableConfirm(true);
        let cards = [];
        questions.forEach((card) => {
            cards.push({ question: card[0], answer: card[1] });
        });

        const result = await fetch("http://localhost:8080/flashcard/edit",
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("flashyToken"),
                    "Content-Type": "application/json"
                },
                method: "PUT", body: JSON.stringify({ name: name, cards: cards, isprivate: isPrivate ? 1 : 0, uuid: initialDeck.uuid, tags: tags })
            }
        )
        const status = result.status;
        console.log(result)

        if (status === 200) {
            window.location.href = "/quiz?uuid=" + initialDeck.uuid;
        } else if (status === 403) {
            alert("You are not authorized to edit this flashcard.");
            window.location.href = "/";
        }
        else {
            alert("An error occurred. Please try again.");
        }
        setDisableConfirm(false);
    }

    useEffect(() => {
        fetchFlashyInfo();
    }, []);
    return (
        <div className='editcontainer'>
            <Navbar />
            <div className='editmaincontainer'>
                <p>Edit Flashcard - <span style={{ fontWeight: "bold" }}>{initialDeck.name}</span></p>
                <span>Made by: {initialDeck.username}</span>
                <div className='editsectioncontainer'>
                    <p>Information</p>
                    <div className='editheadercontainer'>
                        <div>
                        <div>
                            <p>Title</p>
                            <input onChange={(e) => updateName(e)} placeholder='Title' value={name}></input>
                        </div>
                        {checkAuthorization(initialDeck.username) ?
                            <div>
                                <p>Set private</p>
                                <label className='switch'>
                                    <input type='checkbox' onChange={(e) => { handleIsPrivate(e) }} checked={isPrivate}></input>
                                    <div className='slider'></div>
                                </label>
                            </div>
                            : null
                        }

                    </div>
                    <p className='edit_tagheader'>Tags</p>
                    <div className='edit_currenttags_container'>

                        <div>
                            {tags.map((tag) => {
                                return <div className='edit_chosentag' key={tag}>
                                    <IoIosRemoveCircle className='edit_removetagicon' color='#bb1818' onClick={() => setTags([...tags.filter(x => x !== tag)])} /> <span>{tag}</span>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className='edit_searchtag_container'>
                        <TagSearch onaddtag={handleaddtag} />
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
                <button disabled={disableConfirm} onClick={() => confirmEdit()}>Confirm edit</button>
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

export default Edit;