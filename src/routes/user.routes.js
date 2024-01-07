const { upload } = require('../common/upload')
const { UserController } = require('../controllers/user.controller')

const router = require('express').Router()


router.get('/:_id', UserController.getOneUser)
router.patch('/:_id', upload.single('avatar'), UserController.updateUser)





module.exports.UserRouter = router
