const express = require('express')
const mongoose = require("mongoose");
const cors = require("cors");
const { register } = require('./controllers/User.auth.controller');
require("dotenv").config();
const app = express()
const connectDB = require('./config/DB.js')

connectDB()
app.use(cors());
app.use(express.json());



app.use("/api/auth",require('./routes/authRoutes.js'))
app.use("/api/blogs" , require('./routes/blogRoutes.js'))

app.use("/api/user", require("./routes/userRoutes.js"));

app.listen(4000  , ( ) =>{
    console.log('your server is running at localhost:4000')
})