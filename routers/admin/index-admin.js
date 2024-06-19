const router = require("express").Router()
const authRouter = require('./auth-admin')

router.use('/auth', authRouter)

module.exports = router