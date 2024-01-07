const { verifyAuth } = require("../middlewares/auth.middleware")
const { AuthRouter } = require("./auth.routes")
const { EventRouter } = require("./event.routes")
const { UserRouter } = require("./user.routes")
const router = require('express').Router()
const path = require('path')

router.use('/users', verifyAuth, UserRouter)
router.use('/events', verifyAuth, EventRouter)

router.use('/auth', AuthRouter)




module.exports.Routes = router
