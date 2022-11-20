const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL).then(
    console.log('successfully connected')
).catch((err)=>{
    console.log(`${chalk.red('failed to connect to the database')}`);
    console.log(err);
})

module.exports = mongoose