const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatId : String,
    senderId : String,
    recieverId : String,
    text : String,
},{
    timestamps : true
});

const messageModel = mongoose.model("message", messageSchema);

module.exports= messageModel;