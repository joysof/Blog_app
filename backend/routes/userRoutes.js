const router = require('express').Router()
const {UserProfileBlogs} = require('../controllers/UserController.js')


router.get('/:id' , UserProfileBlogs)

module.exports = router