
let mongoose = require('mongoose')


let userSchema = new mongoose.Schema({
    username:String,
    password:String
})


let usermodel = mongoose.model("users", userSchema)


module.exports = usermodel;

/*


let mongoose = require('mongoose')


let userSchema = new mongoose.Schema({
    username:{
    type: String,
    required: true,
    uniquie: true
    },
    password:{
    type: String,
    required: true,
    }
})


let usermodel = mongoose.model("users", userSchema)


module.exports = usermodel;
*/