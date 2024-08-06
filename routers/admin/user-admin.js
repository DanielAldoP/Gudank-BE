const router = require("express").Router()
const userController = require('../../controllers/admin/user-admin')
const adminAuth = require('../../middleware/admin/user/admin-jwt')

router.post('/logout', adminAuth, userController.logout)

module.exports = router