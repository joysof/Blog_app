const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { message } = require('statuses');



const register = async(req , res ) =>{
    try {
        const {name , email , password } = req.body;
        let user = await User.findOne({email})
        if(user) return res.status(400).json({message : 'user already exists'})

        user = new User({name , email , password})
        await user.save()
        res.json({message : 'user regiterd successfully'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const login = async (req , res) =>{
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message : "Invalid credentials "})
        
            const isMatch = await bcrypt.compare(password , user.password)
            if(!isMatch) return res.status(400).json({message: "Invalid credentials"})

        const token = jwt.sign({id:user._id} , "secret123" , {expiresIn:'1d'})
        res.json({token , user:{id : user._id , name: user.name}})
    } catch (error) {
        res.status(500).json({message:error.message})    
    }
}




module.exports = {register , login}