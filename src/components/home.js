import React from "react";
import './css/home.css';

function Home() {
    return (
        <div>
            <div className="container" href="createFlashy">
                <div className="myFlashy">
                    <h1>hei</h1>
                </div>
                <div className="favFlashy">
                    <h1>på</h1>
                </div>
                <a className="createFlashy" href="createFlashy">
                    <div>
                        <h1>Create New Flashy!</h1>
                    </div>
                </a>
                <a className="createAdmin" href="createAdmin">
                    <div>
                        <h1>Create New Admin!</h1>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Home;