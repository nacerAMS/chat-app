const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name : {type: String,
        required: true,
        minlenght: 3,
        maxlenght: 300},

    email : {type: String,
        required: true,
        unique: true, minlenght: 3,
        maxlenght: 300},

    password : {type: String,
        required: true,
        unique: true, minlenght: 3,
        maxlenght: 300},
},{
    timestamps : true
});

const userModel = mongoose.model("User", userSchema);

module.exports= userModel;