const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    userName: {
        type: 'string',
        trim: true,
        required: [true, 'Please provide a name']
    },
    email: {
        type: 'string',
        trim: true,
        required: [true, 'Please provide an e-mail'],
        unique: true
    },
    password: {
        type: 'string',
        trim: true,
        required: [true, 'Please provide a password'],
    },
    role: {
        type: Number,
        default: 0
    }
},{
    timestamp: true
})

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     try {
//         this.password = await bcrypt.hash(this.password, 10);
//         return next();
//     } catch (error) {
//         return next(error);
//     }
// });

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

