const router = require("express").Router()
const authController = require('../../controllers/admin/auth-admin')

router.post('/login', authController.login)

module.exports = router