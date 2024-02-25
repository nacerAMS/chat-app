import { useContext } from "react";
import {Container, Stack} from "react-bootstrap";
import { ChatContext } from "../assist/chatContext";
import { AuthContext } from "../assist/Auth";
import UserChat from "../componets/chat/UserChat";
import PotentailChats from "../componets/chat/potentialChats"
import ChatBox from "../componets/chat/chatBox";
 
const chat = () => {

    const {userChats, isUserChatsLoaing, updateCurrentchat}= useContext(ChatContext);
    
    const {user}= useContext(AuthContext);

    return ( 
        <Container>
            <PotentailChats/>
        {userChats?.length < 1 ? null :(
            <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                {isUserChatsLoaing && <p>Loading Chat</p>}
                {userChats?.map((chat, index)=>{
                    return(<div key= {index} onClick={()=> updateCurrentchat(chat,user)}>
                            <UserChat chat={chat} user={user} />
                        </div>)

                })}

            </Stack>
                <ChatBox/>
            </Stack>
        )}
    </Container> );
}
 
export default chat;