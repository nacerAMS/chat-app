const express = require("express");
const {registerUser, logInUser, findUser, getUser} = require("../controllers/usercontroller")

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", logInUser);
router.get("/find/:userId", findUser);
router.get("/findall", getUser);

module.exports  = router;