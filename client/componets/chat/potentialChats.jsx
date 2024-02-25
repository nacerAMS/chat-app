import { useContext } from "react";
import { ChatContext } from "../../assist/chatContext";
import { AuthContext } from "../../assist/Auth";

const PotentailChats = () => {

    const {user} = useContext(AuthContext);
    const {PotentailChats, createChat} = useContext(ChatContext);

    return ( <>
    <div className="all-users">
        {PotentailChats && PotentailChats.map((u, index)=>{
            return(
           <div className="single-user" key={index} onClick={()=>createChat(user)}>   
           {u.name}
           <span className="user-offline"></span>
           </div>);
        })}
    </div>
    </> );
}
 
export default PotentailChats;