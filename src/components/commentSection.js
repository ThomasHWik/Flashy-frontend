import React, { useEffect, useState } from "react";
import "./css/commentSection.css";

function CommentSection() {

    const [comments, setComments] = React.useState([]);
    const [newComment, setNewComment] = React.useState("");

    useEffect(() => { fetchComments(); }, []);

    async function fetchComments() {
        const result = await fetch("http://localhost:8080/comment/all/" + uuid, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("flashyToken"),
            },
            method: "GET",
        })
        if (result.status === 200) {
            const body = await result.json(); setComments(body);
        }
        else {
            alert("An error occurred. Please try again.");
        }
    }

    const queryParameters = new URLSearchParams(window.location.search);
    const uuid = queryParameters.get("uuid");

    const handleAddComment = () => {
        sendComment(newComment);
        setNewComment("");
    };

    async function deleteComment(uuid) {
        const result = await fetch("http://localhost:8080/comment/delete/"+uuid, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("flashyToken"),
            },
            method: "DELETE",
        });
        console.log(result);
        if (result.status === 200) {
            setComments([...comments.filter((comment) => comment.uuid !== uuid)]);
        }
    }

    async function sendComment(comment) {
        const result = await fetch("http://localhost:8080/comment/create", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("flashyToken"),
            },
            method: "POST",
            body: JSON.stringify({
                comment: comment,
                carddeckuuid: uuid
            }),
        });
        console.log(result);
        if (result.status === 200) {
            const res = await result.json();
            setComments([...comments, res]);
        }
    }

    return (
        <div className = "commentsContainer">
            <h2 className = "commentsHeader">Comments</h2>
            <div className="newComment">
                <textarea
                className="commentsTextarea"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="addComment" onClick={handleAddComment}>
                    Add
                </button>
            </div>
            <div className= "comments">
                {comments.map((comment, index) => (
                    <div className="cmt">
                        <p key={index} className="cmtTxt">
                            {comment.comment}
                        </p>
                        <p className="cmtUser">
                            @
                            <a href={"/publicprofile?u="+comment.username}>
                                {comment.username}
                            </a>
                            {comment.username == localStorage.getItem("flashyUserName") || localStorage.getItem("flashyIsAdmin") == "1" ?
                                <button className="btnDeleteComment" onClick={(e) => {deleteComment(comment.uuid);}}>
                                    ❌
                                </button> : ""
                            }
                        </p>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default CommentSection;