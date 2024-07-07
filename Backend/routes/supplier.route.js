const express = require("express")
const router = express.Router()
const suplierController = require("../Controller/supplier.controller")
const{ validate4suplier, validate4updatesuplier, validate4deletesuplier } = require("../utils/joi.validate")

router.post('/create',validate4suplier, suplierController.createSuplier)
router.post('/update',validate4updatesuplier, suplierController.updateSuplier)
router.delete('/delete',validate4deletesuplier, suplierController.deleteSuplier)
router.get('/getall', suplierController.getAll)

module.exports = router