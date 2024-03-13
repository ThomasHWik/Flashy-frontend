import TagSearch from "./TagSearch";
import '../css/fullsearch.css';
import { useState } from "react";
import { MdExpandLess } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
import { MdExpandMore } from "react-icons/md";

const FullSearch = (props) => {

    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState("");
    const [orderby, setOrderby] = useState("likedesc");

    const [collapsed, setCollapsed] = useState(true);

    const handleAddTag = (tag) => {
        
        if (tags.indexOf(tag) == -1) {
            setTags([...tags, tag]);
        }
    }

    const handleSearch = () => {
        setCollapsed(true);
        props.onsearch(title, tags, orderby);
    }
    
    const handleOrderbyChange = (e) => {
        setOrderby(e.target.value);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }




    return (
    <div className="fullsearch_searchDiv">
    <div onClick={() => setCollapsed(!collapsed)}><p>Search</p> <span >{collapsed ? <MdExpandMore size={30} /> : <MdExpandLess size={30}/>}</span></div>
    <div style={{display: collapsed ? "none" : "flex"}}  className="fullsearch_titlesearchdiv">
        <p>Title</p>
        <input placeholder="Search for title..." value={title} onChange={(e) => handleTitleChange(e)}></input>
        
    </div>
    <div style={{display: collapsed ? "none" : "flex"}} className="fullsearch_searchbottom">
        <div>
            <p>Tags</p>
            <div className='fullsearch_currenttags_container'>

                            {tags.map((tag) => {
                                return <div className='fullsearch_chosentag' key={tag}>
                                    <IoIosRemoveCircle className='fullsearch_removetagicon' color='#bb1818' onClick={() => setTags([...tags.filter(x => x !== tag)])} /> <span>{tag}</span>
                                </div>
                            })}
                        </div>
         
            <TagSearch onaddtag={handleAddTag} />

        </div>
        <div>
            <p>Order by</p>
            <select value={orderby} onChange={(e) => handleOrderbyChange(e)}>  
                <option defaultChecked value="likedesc">Likes (most to least)</option>
                <option value="likeasc">Likes (least to most)</option>
                <option value="favoritedesc">Favorites (most to least)</option>
                <option value="favoriteasc">Favorites (least to most)</option>
                <option value="cardcountdesc">Amount of cards (most to least)</option>
                <option value="cardcountasc">Amount of cards (least to most)</option>
            
            </select>
           
        </div>
        
    </div>
    <button style={{display: collapsed ? "none" : "flex"}} className="fullsearch_searchbtn" onClick={() => handleSearch()}>Search</button>
</div>)
}

export default FullSearch;