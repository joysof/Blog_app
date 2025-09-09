
const Blog = require("../models/Blog.js")


const createBlog = async (req ,res ) =>{
    try {
        const blog = new Blog({ ...req.body , author : req.user})
        await blog.save()
        res.json(blog)
    } catch (error) {
        res.status(500).josn({message : error.message})
    }
}

const getBlogs = async  (req ,res) =>{
    try {
        const blogs = await Blog.find().populate("author" , "name")
        res.json(blogs)
    } catch (error) {
          res.status(500).json({message : error.message})
    }
}

const getBlog = async  (req ,res) =>{
    try {
        const blog = await Blog.findById(req.params.id).populate("author" , "name")
        res.json(blog)
    } catch (error) {
          res.status(500).json({message : error.message})
    }
}

 const updateBlog = async (req,res) =>{
    const {id} = req.params;
    const {title , content} = req.body;

    try {
        const blog = await Blog.findById(id)
        if(!blog)return res.status(404).json({message : "Blog not found"})
        
        blog.title =title || blog.title
        blog.content =content || blog.content
        const updateBlog = await blog.save();
        res.json(updateBlog)
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
 }
const deleteBlog = async (req , res) =>{
    try {
        const blog = await Blog.findById(req.params.id)
        if(!blog) return res.status(404).json({message: "Blog not found"})
        if(blog.author.toString() !==req.user)
            return res.status(403).json({message : 'Not authorized'})

        await blog.deleteOne()
        // blog.findByIdAndDelete(id)
        res.json({message :"Blog deleted"})
    } catch (error) {
        res.status(500).josn({message :error.message})
    }    
}

const getUserBlogs = async( req,res) =>{
    try {
        const blogs = await Blog.find({author : req.params.userId}).populate("author" , "name email")

        .sort({createdAt: -1})
        res.json(blogs)        
    } catch (error) {
        res.status(500).json({message : "server error"})
    }
}



module.exports = {createBlog , getBlogs , getBlog , updateBlog , deleteBlog , getUserBlogs }