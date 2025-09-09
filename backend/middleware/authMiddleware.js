const jwt = require("jsonwebtoken")



const auth = (req ,res , next) =>{

    
   const token = req.header("Authorization")?.replace("Bearer ", "");
    if(!token) return res.status(401).json({message: "NO token auth denied"})
        
    try {
        const decoded = jwt.verify(token , "secret123")
        req.user = decoded.id
        console.log('decoded is' , decoded)
        next()
    } catch (error) {
         console.error("JWT error:", error.message);
        res.status(401).json({message : error.message});
        res.status(401).json({message : "token invalid"})
    }
    
}


module.exports = auth