const mongoose = require('mongoose')

const votes = mongoose.Schema({
    matchId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const votesModel = mongoose.model('admin',admin)

module.exports = votesModel