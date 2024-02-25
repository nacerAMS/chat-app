import { Stack } from "react-bootstrap";
import { userfetchRecipientUser } from "../../src/hooks/userfetchRecipient";

const UserChat = ({chat, user}) => {

    const {recipientUser} = userfetchRecipientUser(chat,user)
    let chatName;
    if (user?._d === chat?.membersId[0]) {
        chatName = chat?.membersName[1]
    }else{chatName = chat?.membersName[0]}

    return ( 
        <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between"
        role="button">
            <div className="d-flex">
                <div className="me-2">
                {chatName}
                </div>
                <div className="text-content">
                    <div className="name"> {chatName}</div>
                    <div className="text"> Text Message</div>
                </div>
            </div>

            <div className="d-flex flex-column align-items-end">
                <div className="date">12/02/2024</div>
                <div className="this-user-notifications">N</div>
                <span className="user-online"></span>
            </div>

        </Stack>
     );
}
 
export default UserChat;