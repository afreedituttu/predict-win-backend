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
    year:{
        type:Number,
        enum:[1,2,3,4]
    },
    branch:{
        type:String,
        enum:['cse','ece','me','civil']
    },
    password:{
        type:String,
        requried:true
    },
    points:{
        type:Number,
        required:true,
        default:0
    },
    image:{
        type:String,
    }
})

const userModel = mongoose.model('users',User)

module.exports = userModel