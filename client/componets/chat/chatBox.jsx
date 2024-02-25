import { useContext, useState } from "react";
import { AuthContext } from "../../assist/Auth";
import { ChatContext } from "../../assist/chatContext";
import { userfetchRecipientUser } from "../../src/hooks/userfetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";


const ChatBox = () => {
    const {user}= useContext(AuthContext);
    const {currentChat, messages, isMessagesLoading,sendTextMessage} = useContext(ChatContext);
    const {recipientUser} = userfetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState("");

    let chatName;
    if (user?._d === currentChat?.membersId[0]) {
        chatName = currentChat?.membersName[1]
    }else{chatName = currentChat?.membersName[0]}

    if (!recipientUser){return(
        <p style={{textAlign: "center", width:"100%"}}>
            no conversation selected yet </p>
    )} 


    return ( <Stack className="chat-box" gap={4}>
        <div className="chat-header">
            <strong>{chatName} </strong>
        </div>
        <Stack className="messages" gap={3}>
            {messages && messages.map((message, index)=><Stack key={index}
            className={`${message?.senderId===user?._id ? 
                "message self align-end flex-grow-0" :
                "message align-start flex-grow-0"}`}>
                <span>{message.text} </span>
                <span>{moment(message.createdAt).calendar()} </span>
            </Stack>)}
        </Stack>
        <Stack direction="horizontal" gap={2} className="chat-input flex-grow-0">

                <InputEmoji value = {textMessage} onChange = {setTextMessage} fontFamily="nunito" borderColor="rgba(72,112,223, 0.2" />
                
                <button className="send-btn" onClick={()=>sendTextMessage(textMessage, user, currentChat?._id, sendTextMessage)}> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
</svg></button>
        </Stack>
    </Stack> );
}
 
export default ChatBox;