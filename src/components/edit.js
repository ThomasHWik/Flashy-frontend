import React, { useEffect } from 'react'
import './css/edit.css'
import Navbar from './navbar'
import TagSearch from './misc/TagSearch'
import { IoIosRemoveCircle } from "react-icons/io";
import './css/tagsearch.css';
import { useState, useRef } from 'react';
import { CiImageOn } from 'react-icons/ci';

function Edit() {

    const [questions, setQuestions] = React.useState([]);

    const [initialDeck, setInitialDeck] = React.useState({
        name: "Hovedstader",
        cards: [],
        isprivate: 0,
        iseditable: 0,
        uuid: "wefkweofp"
    });

    const [disableConfirm, setDisableConfirm] = React.useState(false);

    const [tags, setTags] = React.useState([]);



    const [username, setUsername] = React.useState("");

    const [isPrivate, setIsPrivate] = React.useState(false);

    const [isEditable, setIsEditable] = React.useState(false);

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

    function handleIsEditable(e) {
        setIsEditable(e.target.checked);
    }

    function setCardValue(question, answer, index, uploadedQFile, uploadedAFile, oldqimage, oldaimage) {
        let temp = questions;
        console.log([...temp]);
        temp[index] = [question, answer, uploadedQFile, uploadedAFile, oldqimage, oldaimage];
        console.log("Setting")

        setQuestions([...temp]);

        setTimeout(() => {
            console.log(questions);
        }, 1000);

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
                cards.push([card.question, card.answer, null, null]);
            });

            setQuestions(cards);
            setInitialDeck(deck);
            setIsPrivate(deck.isprivate);
            setIsEditable(deck.iseditable);
            setTags(deck.tags);

            let questionswithimg = [];
            console.log(deck.cards);

            for (let i = 0; i < deck.cards.length; i++) {
                let card = [deck.cards[i].question, deck.cards[i].answer, null, null, null, null];
                if (deck.cards[i].imagequestion != null) {
                    let image = await getImage(deck.cards[i].imagequestion);
                    card[4] = image;
                }
                if (deck.cards[i].imageanswer != null) {
                    let image = await getImage(deck.cards[i].imageanswer);
                    console.log(image);
                    card[5] = image;
                }
                questionswithimg.push(card);

            }

            setQuestions(questionswithimg);





        } else {
            alert("Failed to fetch flashcard / You are not authorized to edit this flashcard.");
            window.location.href = "/";
        }

    }

    async function getImage(uuid) {
        console.log("http://localhost:8080/image/" + uuid);
        let res = await fetch("http://localhost:8080/image/" + uuid);
        if (res.status === 200) {

            let base64String = await res.text();

            const imageSrc = `${base64String}`;

            

            return imageSrc;
        } else {
     
            return "";
        }
    }


    async function fileToBase64(file) {

        function getBase64(file2) {
            const reader = new FileReader()
            return new Promise(resolve => {
                reader.onload = ev => {
                    resolve(ev.target.result)
                }
                reader.readAsDataURL(file2)
            })
        }


        let promise = getBase64(file)


        return await Promise.resolve(promise);
    }


    async function confirmEdit() {
        setDisableConfirm(true);

        let cards = [];
        for (let i = 0; i < questions.length; i++) {
            let qimage = null;
            let aimage = null;
            if (questions[i][2] != null && questions[i][2] != "") {
                qimage = await fileToBase64(questions[i][2]);
            } else if (questions[i][4] != null && questions[i][4] != "") {
                qimage = questions[i][4];
            }

            if (questions[i][3] != null && questions[i][3] != "") {
                aimage = await fileToBase64(questions[i][3]);
            } else if (questions[i][5] != null && questions[i][5] != "") {
                aimage = questions[i][5];
            }
           

 
            cards.push({ question: questions[i][0], answer: questions[i][1], imagequestion: qimage, imageanswer: aimage });
        }

        const result = await fetch("http://localhost:8080/flashcard/edit",
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("flashyToken"),
                    "Content-Type": "application/json"
                },
                method: "PUT", body: JSON.stringify({ name: name, cards: cards, isprivate: isPrivate ? 1 : 0, iseditable: isEditable ? 1 : 0, tags: tags, uuid: initialDeck.uuid })

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
              <h1>Edit Flashcard - <span style={{ fontWeight: "bold" }}>{initialDeck.name}</span></h1>
                <span><h3>Made by: {initialDeck.username}</h3></span>

                <div className='editsectioncontainer'>
                <h2>Information</h2>
                    <div className='editheadercontainer'>
                        <div>
                            <div>
                                <p>Title</p>
                                <input onChange={(e) => updateName(e)} placeholder='Title' value={name}></input>
                            </div>
                            {checkAuthorization(initialDeck.username) ?
                                <div>
                                    <div>
                                        <p>Set private</p>
                                        <label className='switch'>
                                            <input type='checkbox' onChange={(e) => { handleIsPrivate(e) }} checked={isPrivate}></input>
                                            <div className='slider'></div>
                                        </label>
                                    </div>
                                    <div>
                                        <p>Editable</p>
                                        <label className='switch'>
                                            <input type='checkbox' id="isEditableButton" onChange={(e) => { handleIsEditable(e) }} checked={isEditable} value={isEditable}></input>
                                            <div className='slider'> </div>
                                        </label>
                                    </div>
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
                        {questions.map((i, v) => { console.log(i[5]); return <Box key={v} question={i[0]} getValues={getValues} answer={i[1]} oldqimage={i[4]} oldaimage={i[5]}  updateFunc={setCardValue} index={v} deleteCard={deleteCard} /> })}
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

    const [uploadedQFile, setUploadedQFile] = useState(null);
    const [uploadedAFile, setUploadedAFile] = useState(null);

    const [oldQImage, setOldQImage] = useState(null);
    const [oldAImage, setOldAImage] = useState(null);

    const [showQImage, setShowQImage] = useState(false);
    const [showAImage, setShowAImage] = useState(false);

    const qImageInputRef = useRef();
    const aImageInputRef = useRef();

    const handleQFileUpload = (e) => {
        setUploadedQFile(e.target.files[0]);
       
        update(question, answer, e.target.files[0], uploadedAFile, null, oldAImage);
    }

    const removeQFile = () => {
        setUploadedQFile("");
        update(question, answer, null, uploadedAFile, null, oldAImage);
        qImageInputRef.current.value = "";
    }

    const handleAFileUpload = (e) => {
        console.log("ADDED A FILE")
        setUploadedAFile(e.target.files[0]);
        console.log(e.target.files[0]);
        update(question, answer, uploadedQFile, e.target.files[0], oldQImage, null);
    }

    const removeAFile = () => {
        setUploadedAFile("");
        update(question, answer, uploadedQFile, null, oldQImage, null);
        aImageInputRef.current.value = "";
    }

    useEffect(() => {
        setQuestion(props.question || '');
        setAnswer(props.answer || '');
        setUploadedQFile(uploadedQFile || null);
        setUploadedAFile(uploadedAFile || null);
        console.log(props)
        setOldQImage(props.oldqimage || null);
        setOldAImage(props.oldaimage || null);
        

    }, [props.question, props.answer, props.oldqimage, props.oldaimage]);



    function update(question, answer, uploadedQFile, uploadedAFile, oldqimage, oldaimage) {
   
        props.updateFunc(question, answer, props.index, uploadedQFile, uploadedAFile, oldqimage, oldaimage);
    }

    function updateQuestion(e) {

        setQuestion(e.target.value);
        update(e.target.value, answer, uploadedQFile, uploadedAFile, oldQImage, oldAImage);
    }

    function updateAnswer(e) {

        setAnswer(e.target.value);
        update(question, e.target.value, uploadedQFile, uploadedAFile, oldQImage, oldAImage);
    }

    return (
        <div>
            <div className="box">
                <button className="editdeletecardbtn" onClick={() => props.deleteCard(props.index)}>Delete</button>
                <div className='question'>
                    <textarea rows={10} placeholder='Question' onInput={(e) => updateQuestion(e)} value={question} />
                    <div className='edit_boximagecontainer'>
                        <div className='edit_boximagepopup' style={{ display: showQImage ? "flex" : "none" }}>
                            <img src={uploadedQFile ? URL.createObjectURL(uploadedQFile) : oldQImage ? oldQImage : ''} />
                        </div>
                        {uploadedQFile ?
                            <CiImageOn onMouseEnter={() => setShowQImage(true)} onMouseLeave={() => setShowQImage(false)} size={25} className='edit_boximageicon' />
                            : null}
                        {
                            !uploadedQFile && oldQImage ? <CiImageOn onMouseEnter={() => setShowQImage(true)} onMouseLeave={() => setShowQImage(false)} size={25} className='edit_boximageicon' />
                            : null}
                        

                        <input accept='image/jpeg' type='file' style={{display: "none"}} ref={qImageInputRef} className='qImageInput' onChange={handleQFileUpload} />
                        <button  onClick={() => qImageInputRef.current.click()}>Choose image</button>
                        
                       {uploadedQFile || oldQImage ? <button className='edit_removefilebtn' onClick={removeQFile}>Remove image</button> : null}
                    </div>
                </div>
                <div className='editverticalline'></div>
                <div className='answer'>
                    <textarea rows={10} placeholder='Answer' onInput={(e) => updateAnswer(e)} value={answer} />
                    <div className='edit_boximagecontainer'>

                        <div className='edit_boximagepopup' style={{ display: showAImage ? "flex" : "none" }}>
                            <img src={uploadedAFile ? URL.createObjectURL(uploadedAFile) : props.oldaimage ? oldAImage : ''} />
                        </div>
                        {uploadedAFile ?
                            <CiImageOn onMouseEnter={() => setShowAImage(true)} onMouseLeave={() => setShowAImage(false)} size={25} className='edit_boximageicon' />
                            : null}
                              {
                            !uploadedAFile && oldAImage ? <CiImageOn onMouseEnter={() => setShowAImage(true)} onMouseLeave={() => setShowAImage(false)} size={25} className='edit_boximageicon' />
                            : null}
                        <input accept='image/jpeg' type='file' style={{display: "none"}} ref={aImageInputRef} className='aImageInput' onChange={handleAFileUpload} />
                        <button onClick={() => aImageInputRef.current.click()}>Choose image</button>
                        {uploadedAFile || oldAImage ? <button className='edit_removefilebtn' onClick={removeAFile}>Remove image</button> : null}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Edit;