import { useState, useEffect } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const userfetchRecipientUser = (chat, user)=>{

    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    const recipientId = chat?._id
    useEffect(()=>{

        const getUser = async()=>{
            if (!recipientId) return null

            const response = await getRequest(`${baseUrl}/chats/${recipientId}`);

            if (response?.error) {
                return setError(response)
            };

        
            setRecipientUser(response);

        };

        getUser()
    },[recipientId]);

    return {recipientUser}

}