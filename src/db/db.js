let mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.MONGOODB_URL)
    .then(()=>{
        console.log("Connected to DB")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports = connectToDB;