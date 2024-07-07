const express = require("express")
const router = express.Router()
const userControler = require("../Controller/user.controller")
const { validate4signup } = require("../utils/joi.validate")


router.post("/login",userControler.login)
router.post("/signup", validate4signup, userControler.signup)
router.get("/getall",userControler.getall)

module.exports = router