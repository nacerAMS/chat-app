const chatModel = require("../models/chatModel");

const createChat = async(req, res)=>{
    const {First, Second} = req.body;

    try {
        const chat = await chatModel.findOne({
            membersId:{$all: [First._id, Second._id]}
        })

        if (chat) {
            return res.status(200).json(chat);}
        
        const newChat = new chatModel({
            membersId: [First._id, Second._id],
            membersName: [First.name, Second.name],
            membersEmail: [First.email, Second.email]
        });

        const response = await newChat.save();
        res.status(200).json(response)

        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findUserChat = async(req, res)=>{

    const userId = req.params.userId;
    try {
        const chats = await chatModel.find({
            membersId: {$in: [userId]}
        });

        res.status(200).json(chats)
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findChat = async(req, res)=>{

    const {FirstId, SecondId} = req.params;
    
    try {
        const chat = await chatModel.findOne({
            membersId:{$all: [FirstId, SecondId]}
        });

        res.status(200).json(chat)
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {createChat, findUserChat, findChat };