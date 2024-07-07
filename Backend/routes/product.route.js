const express = require("express")
const router = express.Router()
const productControler = require("../Controller/product.controller")
const { validate4addproduct } = require("../utils/joi.validate")

router.post("/add",validate4addproduct, productControler.addProduct)
router.delete("/delete",productControler.deleteProduct)
router.patch("/update",productControler.updateProduct)
router.get("/getproduct",productControler.getProductByStyleNo)
router.get("/getall", productControler.getProducts)
router.post("/getbyid",productControler.getProductDetailswithUser)
router.post("/getbycategory",productControler.productByCategory)

module.exports = router