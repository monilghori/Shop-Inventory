const express = require("express")
const router = express.Router()

const userProductControler = require("../Controller/userproduct.controller")

router.post("/add",userProductControler.addProduct)
router.post("/getall",userProductControler.getProducts)
router.post("/getproductbystyleno",userProductControler.getProductsByStyleNo)
router.post("/delete",userProductControler.removeProduct)
router.post("/update",userProductControler.update)
router.post("/id",userProductControler.getProductById)
router.post("/bycategory",userProductControler.useProductByCategory)

module.exports = router