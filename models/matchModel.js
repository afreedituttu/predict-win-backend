const mongoose = require('mongoose')

const match = mongoose.Schema({
    team1:{
        type:String,
        required:ture
    },
    team2:{
        type:String,
        required:ture
    },
    active:{
        type:Boolean,
        defaul:true
    },
    time:{
        type:String
    }
})

const matchModel = mongoose.model('users',match)

module.exports = matchModel