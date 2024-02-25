const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken") ;

const createToken = (_id) => {
    const jwtKey = process.env.JWT_SEc_KEY;
    
    return jwt.sign({_id}, jwtKey);
};
//registering Users
const registerUser = async(req, res) => {

    try{
    const {name, email, password} = req.body;

    let user = await userModel.findOne({email});

    if(user) return res.status(400).json("User witht this email existed...");
    
    if(!name || !email || !password) return res.status(400).json("all fields are require...");

    if(!validator.isEmail(email)) return res.status(400).json("email is not valid...");

    user = new userModel({name, email, password});

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id);

    res.status(200).json({_id : user._id, name, email, token});
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }    
};
//login Users
const logInUser = async(req, res) => {
    const {email, password} = req.body;

    try {
        let user = await userModel.findOne({email});

        if (!user) return res.status(400).json("user does not exist...!");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) return res.status(400).json("password is incorrect...!");

        const token = createToken(user._id);

        res.status(200).json({_id : user._id, name: user.name, email, token});

    } catch (error) {  
        console.log(error);
        res.status(500).json(error);
    }

};

const findUser= async(req, res)=>{

    const userId = req.params.userId;

    try {
        const user = await userModel.findById(userId);
        //if(!user) return res.status(400).json("user is not exict");
        res.status(200).json(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const getUser= async(req, res)=>{

    const userId = req.params.userId;

    try {
        const users = await userModel.find();
        res.status(200).json(users);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


module.exports = { registerUser, logInUser, findUser, getUser };