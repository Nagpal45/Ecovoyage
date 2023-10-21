const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 6
    },
    picture:{
        type: String,
        default: "",
    },
    dob:{
        type: Date,
        default: 0,
    },
    phone:{
        type: String,
        default: "",
    },
    address:{
        type: String,
        default: "",
    },
    

    

}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;