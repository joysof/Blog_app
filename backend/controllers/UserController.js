const User = require('../models/User')
const Blog = require('../models/Blog')

const UserProfileBlogs = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); 
    if (!user) return res.status(404).json({ message: "User not found" });
    const blogs = await Blog.find({ author: req.params.id });

    res.json({ user, blogs });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {UserProfileBlogs}