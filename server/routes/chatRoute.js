const express = require("express");
const {createChat, findUserChat, findChat} = require("../controllers/chatController")

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", findUserChat);
router.get("/find/:FirstId/:SecondId", findChat);

module.exports  = router;