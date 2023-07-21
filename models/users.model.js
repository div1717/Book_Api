const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    userName: {
        type: 'string',
        trim: true,
        required: [true, 'Please provide a name'],
        maxlength: 32
    },
    email: {
        type: 'string',
        trim: true,
        required: [true, 'Please provide an e-mail'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid e-mail'
        ]
    },
    password: {
        type: 'string',
        trim: true,
        required: [true, 'Please provide a password'],
        match: [
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
            'It must contain at least one digit (0-9), It must contain at least one special character from the set (!, @, #, $, %, ^, &, *), It must consist of characters from the set of uppercase letters (A-Z), lowercase letters (a-z), digits (0-9), and the specified special characters, It must be between 6 and 16 characters in length (inclusive)'
        ]
    },
    role: {
        type: Number,
        default: 0
    }
},{
    timestamp: true
})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

