import "../css/carddecklistelement.css";
import { FaStar } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { TbCardsFilled } from "react-icons/tb";



const CarddeckListElement = (props) => {
    
    return (
       
        <div className="cdle_container">
            <a href={"/quiz?uuid="+props.carddeck.uuid} className="cdle_innerlink_container">
               <div className="cdle_left_container">
                <div>
                    <p>{props.carddeck.name}</p>
                    <a href={"/publicprofile?u="+props.carddeck.username}>@{props.carddeck.username}</a>
                    </div>
                    <div><TbCardsFilled/><p>{props.carddeck.cardcount}</p></div>
               </div>
               <div>
                {/* TAGS */}
               </div>
               <div className="cdle_right_container">
                    <div>
                        <FcLike />
                        <p>{props.carddeck.likecount}</p>
                    </div>
                    <div>
                        <FaStar color="#E3C565" />
                        <p>{props.carddeck.favoritecount}</p>
                    </div>
               </div>
            </a>
        </div>
     
    )
}

export default CarddeckListElement;