const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { type } = require('os')
const { stringify } = require('querystring')

const userschema = new mongoose.Schema({
    name :{
        type: String,
        required : true
    },
    email:{
        type:String,
        required : true,
        unique : true
    },
    password :{
        type: String,
        required:true
    }
})

// password Hashing 
userschema.pre('save' , async function ( next) {
    if(!this.isModified ("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

module.exports = mongoose.model("User" , userschema)