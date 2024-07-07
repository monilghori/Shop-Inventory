const categoryController = require("../Controller/category.controller")
const express = require('express')
const router = express.Router()

router.post('/create', categoryController.create)
router.get('/getall', categoryController.getAll)

module.exports = router