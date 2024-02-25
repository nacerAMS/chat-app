const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
    membersId : Array,
    membersName : Array,
    membersEmail : Array,
    messages: Array
},{
    timestamps : true
});

const chatModel = mongoose.model("Chat", chatSchema);

module.exports= chatModel;