const router = require("express").Router()
const settingController = require('../../controllers/admin/setting-admin')
const adminAuth = require('../../middleware/admin/user/admin-jwt')
const settingValidation = require('../../middleware/admin/validator/set-config-validation')

router.post('/create-config', settingValidation ,adminAuth, settingController.createConfig)
router.post('/update-config',adminAuth, settingController.updateConfig)

module.exports = router