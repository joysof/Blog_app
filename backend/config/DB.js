const mongoose = require('mongoose')

const connectDB =async () =>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/blogapp");
        console.log("db is connect successful")
    } catch (error) {
        console.log('db is not connect ', error.message)
        process.exit(1)
    }
}

module.exports = connectDB