const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL).then(
    console.log('successfully connected')
).catch((err)=>{
    console.log('failed to connect to the database');
    console.log(err);
})

module.exports = mongoose