const mongoose = require('mongoose')

const User = mongoose.Schema({
    email:{
        type:String,
        requried:true
    },
    name:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    password:{
        type:String,
        requried:true
    },
    points:{
        type:Number,
        required:true,
        default:5
    },
    team:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        default:true
    }
})

const userModel = mongoose.model('users',User)

module.exports = userModel