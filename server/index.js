const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const chatRouter = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");

require("dotenv").config();


const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRoute)

app.get("/", (req,res)=>{
    res.send("welcome to our chatapp API");
})

const port =process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;

app.listen(port, (req, res)=>{
    console.log(`server running on port : ${port}`)

});

mongoose.connect(uri).then(()=>
    console.log("connected to mangoDB")
).catch((error)=>{
    console.log("connection to mongoDB failed:  ", error.message)
})

