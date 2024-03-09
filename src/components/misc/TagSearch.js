
import React, { useEffect, useState } from 'react';
import '../css/tagsearch.css';

const TagSearch = (props) => {

    const [searchresults, setSearchResults] = useState([]);

    const [searchinput, setSearchInput] = useState("");


    const fetchTags = async () => {
        if (searchinput.length < 1) { 
            setSearchResults([]);
            return;
        }
        const response = await fetch("http://localhost:8080/tag/search/" + searchinput, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET"
        });
       
        if (response.status === 200) {
            const tags = await response.json();
        
            setSearchResults(tags);
        } else {
            setSearchResults([]);
        }
    }

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    }

    useEffect(() => {
        fetchTags();
    }, [searchinput]);

    const handleTagClick = (value) => {
        props.onaddtag(value);
        setSearchInput("");
    }




    return (
        <div className='tagsearch_search'>
            <input type="text" id="tag" placeholder="Search..." value={searchinput} onInput={(e) => handleSearchInput(e)} />
            <div className='tagsearch_resultcontainer'>
                    {searchinput.length > 0 && searchresults.indexOf(searchinput.toLowerCase()) === -1? <span className='tagsearch_searchresult' onClick={() => handleTagClick(searchinput.toLowerCase())}  key={searchinput + "_"}>{searchinput.toLowerCase()}</span> : null}
                {searchresults.map((tag) => {
                    return (
                        <span onClick={() => handleTagClick(tag)}  className='tagsearch_searchresult' key={tag}>
                            {tag}
                        </span>
                    );
                })}
            </div>
        </div>
    )
};



export default TagSearch;