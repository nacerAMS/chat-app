import { createContext, useState, useEffect, useCallback } from "react";
import { getRequest, baseUrl, postRequest } from "../src/utils/services";;

export const ChatContext = createContext();

export const ChatContextProvider = ({children, user}) =>{
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoaing, setIsUserChatsLoaing] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [PotentailChats, setPotentailChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [sendTextMessagesError, setSendTextMessagesError] = useState(null);


    useEffect(()=>{

        const getUsers = async()=>{

            const response = await getRequest(`${baseUrl}/users/findall`);
            if (response.error) {  
                return console.error("error fetching users", response)
            };

            const pChats =response.filter((u)=>{
                let isChatcreated = false;
                
                    

                if (user?._id === u._id) {return false};

                if(userChats){
                    isChatcreated =userChats?.some((chat)=>{
                        return chat.membersId[0]=== u._id || chat.membersId[1] === u._id
                    })
                };

                return !isChatcreated;
                
            });

            setPotentailChats(pChats);

        };
        getUsers();
    },[userChats]);

    useEffect(()=>{
        const getUserChat = async()=>{
            if (user?._id) {

                setIsUserChatsLoaing(true);
                setUserChatsError(null);

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

                setIsUserChatsLoaing(false);

                if (response.error) {
                    return setUserChatsError(response);
                }
                setUserChats(response);
            }
        }

        getUserChat()
    },[user]);
    
    useEffect(()=>{
        const getMessages = async()=>{
                setIsMessagesLoading(true);
                setMessagesError(null);

                let response;
                console.log("currentChat",currentChat)
                if (currentChat) {
                    
                if(user._id === currentChat.membersId[0] ||user._id === currentChat.membersId[1]){
                 response = await getRequest(`${baseUrl}/messages/${currentChat._id}`);
            }}

                setIsMessagesLoading(false);
                setMessages(response);
            
        }

        getMessages()
    },[currentChat]);

    const sendTextMessage = useCallback(async(textMessage, sender, currentChatId, setTextMessage)=>{

        if (!textMessage) return console.log("message is empty...");

        const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id ,
            text: textMessage
        }));
        console.log("response",response)

        if (response.error) {
            return setSendTextMessagesError(response);
        }
        setNewMessage(response);
        setMessages((prev)=>[...prev, response])

        setTextMessage("");

    },[]);

    const updateCurrentchat = useCallback(async(chat)=>{
        setCurrentChat(chat)
    },[])

    const createChat = useCallback(async(First, Second)=>{
        console.log("First",First)
        console.log("Second",Second)
        const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({
            First, 
            Second
        }));

        if (response.error) {
            return console.log("error creating chat", response);
        }

        setUserChats((prev)=>[...prev, response]);    },[])

    return <ChatContext.Provider value={{
            userChats,
            isUserChatsLoaing,
            userChatsError,
            PotentailChats,
            createChat,
            updateCurrentchat,
            messages,
            isMessagesLoading,
            messagesError,
            currentChat,
            sendTextMessage
            }}>
            {children}
            </ChatContext.Provider>

}