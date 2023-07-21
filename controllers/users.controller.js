const User = require('../models/users.model');

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
        const user = await User.create({userName, email, password});
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

module.exports = signup;