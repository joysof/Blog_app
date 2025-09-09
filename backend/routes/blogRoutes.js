const express = require("express")
const {createBlog , getBlogs , getBlog , updateBlog , deleteBlog, getUserBlogs} = require('../controllers/Blog.controller.js')
const auth = require('../middleware/authMiddleware.js');





const router = express.Router()
router.post('/', auth, createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlog);   
router.put('/:id', updateBlog);     
router.delete('/:id',auth, deleteBlog);
router.get("/api/user/:id" , getUserBlogs)



module.exports = router