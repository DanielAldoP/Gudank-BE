const router = require("express").Router()
const adminRouter = require('./admin/index-admin')
// const userRouter = require('./user/index-user')

router.use('/api/admin', adminRouter)
// router.use('/api/user', userRouter)

module.exports = router