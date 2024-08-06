const router = require("express").Router()
const authRouter = require('./auth-admin')
const userRouter = require('./user-admin')
const settingRouter = require('./setting-admin')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/setting', settingRouter)

module.exports = router