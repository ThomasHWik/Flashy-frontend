import React, { useEffect, useState, useRef } from 'react'
import './css/edit.css'
import { Checkbox } from "@mui/material";
import Navbar from './navbar'
import TagSearch from './misc/TagSearch'
import { IoIosRemoveCircle } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";



function CreateFlashy() {

    const [questions, setQuestions] = React.useState([]);

    const [disableConfirm, setDisableConfirm] = React.useState(false);

    const [username, setUsername] = React.useState("");

    const [isPrivate, setIsPrivate] = React.useState(false);

    const [isEditable, setIsEditable] = React.useState(false);

    const [tags, setTags] = React.useState([]);


    const uuid = new URLSearchParams(window.location.search).get("uuid");

    function handleIsPrivate(e) {
        setIsPrivate(e.target.checked);
    }

    function handleIsEditable(e) {
        setIsEditable(e.target.checked);
    }



    function handleaddtag(tag) {
        if (tags.indexOf(tag) !== -1) {
            return;
        } else {
            setTags([...tags, tag]);
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

    async function setCardValue(question, answer, index, uploadedQFile, uploadedAFile) {
        let temp = questions;
        console.log(uploadedAFile)



        temp[index] = [question, answer, uploadedQFile, uploadedAFile];
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

    const [name, setName] = React.useState("");

    function updateName(e) {
        setName(e.target.value);
    }

    async function confirmCreate() {
        setDisableConfirm(true);
        let cards = [];
        for (let i = 0; i < questions.length; i++) {
            let qimage = null;
            let aimage = null;
            if (questions[i][2] != null && questions[i][2] != "") {
                qimage = await fileToBase64(questions[i][2]);
            }

            if (questions[i][3] != null && questions[i][3] != "") {
                console.log("AIMAGE")
                aimage = await fileToBase64(questions[i][3]);
            }
            cards.push({ question: questions[i][0], answer: questions[i][1], imagequestion: qimage, imageanswer: aimage });
        }

        console.log(JSON.stringify({ name: name, cards: cards, tags: tags, isprivate: isPrivate ? 1 : 0, iseditable: isEditable ? 1 : 0 }))
        const result = await fetch("http://localhost:8080/flashcard/create",
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("flashyToken"),
                    "Content-Type": "application/json"
                },
                method: "POST", body: JSON.stringify({ name: name, cards: cards, tags: tags, isprivate: isPrivate ? 1 : 0, iseditable: isEditable ? 1 : 0 })

            }
        )
        const status = result.status;
        console.log(result)

        if (status === 200) {
            window.location.href = "/profile"
        } else {
            alert("You are not authorized to create flashcard.");
            window.location.href = "/";
        }

        setDisableConfirm(false);
    }


    return (
        <div className='editcontainer'>
            <Navbar />
            <div className='editmaincontainer'>
                <h1>Create Flashcard</h1>
                <div className='editsectioncontainer'>
                    <h2>Information</h2>
                    <div className='editheadercontainer'>
                        <div>
                            <div>
                                <p>Title</p>
                                <input className='titleInput' onChange={(e) => updateName(e)} placeholder='Title' value={name}></input>
                            </div>
                            <div>
                                <p>Set private</p>
                                <label className='switch'>
                                    <input type='checkbox' onChange={(e) => { handleIsPrivate(e) }} value={isPrivate}></input>
                                    <div className='slider'></div>
                                </label>
                            </div>
                            <div>
                                <p>Editable</p>
                                <label className='switch'>
                                    <input type='checkbox' onChange={(e) => { handleIsEditable(e) }} value={isEditable}></input>
                                    <div className='slider'></div>

                                </label>
                            </div>
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
                            <p className="editaddcardbtn">+</p>
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

    const [uploadedQFile, setUploadedQFile] = useState(null);
    const [uploadedAFile, setUploadedAFile] = useState(null);

    const [showQImage, setShowQImage] = useState(false);
    const [showAImage, setShowAImage] = useState(false);

    const qImageInputRef = useRef();
    const aImageInputRef = useRef();

    const handleQFileUpload = (e) => {
        setUploadedQFile(e.target.files[0]);
        update(question, answer, e.target.files[0], uploadedAFile);
    }

    const removeQFile = () => {
        setUploadedQFile(null);
        update(question, answer, null, uploadedAFile);
        qImageInputRef.current.value = "";
    }

    const handleAFileUpload = (e) => {
        setUploadedAFile(e.target.files[0]);
        update(question, answer, uploadedQFile, e.target.files[0]);
    }

    const removeAFile = () => {
        setUploadedAFile(null);
        update(question, answer, uploadedQFile, null);
        aImageInputRef.current.value = "";
    }

    useEffect(() => {
        setQuestion(props.question || '');
        setAnswer(props.answer || '');
        setUploadedQFile(uploadedQFile || null);
        setUploadedAFile(uploadedAFile || null);
        
    }, [props.question, props.answer]);


    function update(question, answer, uploadedQFile, uploadedAFile) {
        props.updateFunc(question, answer, props.index, uploadedQFile, uploadedAFile);
    }

    function updateQuestion(e) {

        setQuestion(e.target.value);
        update(e.target.value, answer, uploadedQFile, uploadedAFile);
    }

    function updateAnswer(e) {

        setAnswer(e.target.value);
        update(question, e.target.value, uploadedQFile, uploadedAFile);
    }

    return (
        <div>
            <div className="box">
                <button className="editdeletecardbtn" onClick={() => props.deleteCard(props.index)}>Delete</button>
                <div className='question'>
                    <textarea rows={10} placeholder='Question' onInput={(e) => updateQuestion(e)} value={question} />
                    <div className='edit_boximagecontainer'>
                        <div className='edit_boximagepopup' style={{ display: showQImage ? "flex" : "none" }}>
                            <img src={uploadedQFile ? URL.createObjectURL(uploadedQFile) : ''} />
                        </div>
                        {uploadedQFile ?
                            <CiImageOn onMouseEnter={() => setShowQImage(true)} onMouseLeave={() => setShowQImage(false)} size={25} className='edit_boximageicon' />
                            : null}

                        <input accept='image/jpeg' type='file' style={{display: "none"}} ref={qImageInputRef} className='qImageInput' onChange={handleQFileUpload} />
                        <button  onClick={() => qImageInputRef.current.click()}>Choose image</button>
                        
                       {uploadedQFile ? <button className='edit_removefilebtn' onClick={removeQFile}>Remove image</button> : null}
                    </div>
                </div>
                <div className='editverticalline'></div>
                <div className='answer'>
                    <textarea rows={10} placeholder='Answer' onInput={(e) => updateAnswer(e)} value={answer} />
                    <div className='edit_boximagecontainer'>

                        <div className='edit_boximagepopup' style={{ display: showAImage ? "flex" : "none" }}>
                            <img src={uploadedAFile ? URL.createObjectURL(uploadedAFile) : ''} />
                        </div>
                        {uploadedAFile ?
                            <CiImageOn onMouseEnter={() => setShowAImage(true)} onMouseLeave={() => setShowAImage(false)} size={25} className='edit_boximageicon' />
                            : null}
                        <input accept='image/jpeg' type='file' style={{display: "none"}} ref={aImageInputRef} className='aImageInput' onChange={handleAFileUpload} />
                        <button  onClick={() => aImageInputRef.current.click()}>Choose image</button>
                        {uploadedAFile ? <button className='edit_removefilebtn' onClick={removeAFile}>Remove image</button> : null}
                    </div>

                </div>
            </div>
        </div>

    )
}

export default CreateFlashy;