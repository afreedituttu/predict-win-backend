const mongoose = require('mongoose')

const match = mongoose.Schema({
    team1:{
        type:String,
        required:true
    },
    team2:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        defaul:true
    },
    time:{
        type:String
    }
})

const matchModel = mongoose.model('matches',match)

module.exports = matchModel