const User = require('../models/users.model');
const{
    validemail,
    validPassword
}=require("../helpers/validation.helpers");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async(req, res) => {
    const {userName, email, password} = req.body;
    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(400).json({
            success: false,
            message: "User already present in database"
        })
    }

    try {
        // console.log(password);

        if(!validemail(email)){
            return res.status(400).json({
                success: false,
                message:
                    "Enter a valid email address"
             });
        }

        if (!validPassword(password)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least one digit (0-9), one special character from the set (!, @, #, $, %, ^, &, *), and consist of characters from the set of uppercase letters (A-Z), lowercase letters (a-z), digits (0-9), and the specified special characters. It must be between 6 and 1000 characters in length (inclusive)."
             });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);

        const user = await User.create({
            userName,
            email,
            password: hashedPassword // Include the hashed password in the data
          });
          res.status(201).json({
            success: true,
            user,
          });
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

const signin = async(req, res) =>{
    const email = req.body.email;
    const existingUser = await User.findOne({ email});

    if(existingUser == null) {
        return res.status(404).json({
            success: false,
            message: "invalid credentials!"
        })
    }

    try {
        const isMatched = await bcrypt.compare(req.body.password, existingUser.password);
        if(!isMatched){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!"
            })
        }
        
        const user = {
            name : req.body.userName
        }
        
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        return res.status(200).json({
            success: true,
            message: "You are successfully logged in!",
            accessToken
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null)
        return res.status(401).json({
            success: false,
            message: "token is null"
        })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({
            success : false,
            message : "token is not valied so you dont have access"
        })

        req.user = user;
        next();
    })

}

module.exports ={
    signin,
    signup,
    authenticateToken
};