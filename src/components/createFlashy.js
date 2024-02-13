import { Checkbox, ToggleButton } from "@mui/material";
import React from "react"
import { useState } from "react"
import "./CreateFlashy.css"

/*Få spørsmålene i rekkefølge i databasen og faktisk legge til input i databasen */

function CreateFlashy(){
    /*const [inputValue, setInputValue] = useState('');
    function addQ(){
            setInputValue();

            const handleInputChange = (e) => {
                setInputValue(e.target.value);
              };
    }*/

    return (    
        <div className="create">
           <p className="title"><h2>Title: <input type="text" ></input></h2></p>
            <p className="movetext">
                <h3>Fill in question: <input type="text"></input></h3>
                <h3>Fill in answer: <input type="textfield"></input> </h3>
            </p>
            <p><button>Add new question</button>

            <h3>Press for public carddeck <Checkbox></Checkbox></h3>

            <button>Done</button>

            </p>
            
        </div>
    )


}

export default CreateFlashy;