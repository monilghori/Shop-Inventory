const userProductSchema = require("../Models/userproduct.model")
const productSchema = require("../Models/product.model")
const userSchema = require("../Models/user.model")
const enums = require("../utils/enums.json")
const message = require("../utils/message.json")

module.exports = {
    // Add product to cart
    addProduct: async (req, res) => {
        try {
            const { user, product, quantity, size, color } = req.body
            const productData = await productSchema.findById(product)
            if (!productData) {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({ success : false, message: message.PRODUCT_NOT_FOUND })
            }
            const userProductData = new userProductSchema({
                user,
                product,
                quantity,
                size,
                color
            })
            productData.Totalquantity = productData.Totalquantity + parseInt(quantity)
            const userProductdata = await userProductSchema.create(userProductData)
            const productdata = await productSchema.updateOne({_id:product},{$set : { Totalquantity : productData.Totalquantity }})
            
            if(userProductdata && productdata)
                {
                    return res
                            .status(enums.HTTP_CODE.OK)
                            .json({ success : true, message: message.PRODUCT_ADDED, userProduct: userProductData })
                }
        } catch (error) {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({ success : false, message: error.message })
        }
    },
    // Get all products from cart
    getProducts: async (req, res) => {
        const { id } = req.body
        try {
            const user = id
            const userProductData = await userProductSchema.find({ user }).populate({
                path:'product',
                populate: {
                  path: 'supplier',
                }
              })
              .exec();
            return res
                    .status(enums.HTTP_CODE.OK)
                    .json({ success : true, message: message.SUCCESS, products:userProductData })
        } catch (error) {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({ success : false, message: error.message })
        }
    },
    getProductsByStyleNo : async (req, res) => {
        const { styleNo } = req.body
        try {
            const userProductData = await userProductSchema.find().populate({
                path: 'product',
                match: { styleNo },
                populate: {
                  path: 'supplier',
                }
              })
              .exec();
            const filteredUserProductData = userProductData.filter(up => up.product !== null);
            return res
                    .status(enums.HTTP_CODE.OK)
                    .json({ success : true, message: message.SUCCESS, products:filteredUserProductData })
        } catch (error) {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({ success : false, message: error.message })
        }
    },
    // Remove product 
    removeProduct: async (req, res) => {
        try {
            const { id } = req.body
            const data = await userProductSchema.findByIdAndDelete(id)
            const product = await productSchema.findOne({_id:data.product})
            product.Totalquantity = product.Totalquantity - data.quantity
            const productData = await productSchema.updateOne({_id:product._id},{$set : {Totalquantity:product.Totalquantity}})
            if(data)
                {
                    return res
                            .status(enums.HTTP_CODE.OK)
                            .json({ success: true, message: message.PRODUCT_DELETED})
                }
            return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: message.FAILED })
        } catch (error) {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({ message: error.message })
        }
    },
    update: async (req, res) => {
        try {
            const { _id, quantity, color, size } = req.body
            const userProduct = await userProductSchema.findOne({_id:_id})
            const product = await productSchema.findOne({_id:userProduct.product})
            
            const updatedQuantity = product.Totalquantity + quantity - userProduct.quantity
            userProduct.quantity = quantity
            userProduct.color = color
            userProduct.size = size
            if(quantity==0)
                {
                    userProduct.available = false
                }
                else{
                    userProduct.available = true
                }

            const userProductData = await userProductSchema.updateOne({_id:_id},{$set : {quantity:quantity, color:color, size:size, available : userProduct.available}})
            const productData = await productSchema.updateOne({_id:product._id},{$set : {Totalquantity:updatedQuantity}});

            /* const { updatedProduct } = req.body
            const userProduct = await userProductSchema.findOne({_id:updatedProduct._id})
            const product = await productSchema.findOne({_id:userProduct.product}) */
            
            //product.Totalquantity = product.Totalquantity + updatedProduct.quantity - userProduct.quantity
            //userProduct.quantity = updatedProduct.quantity
           /*  if(updatedProduct.quantity==0)
                {
                    updatedProduct.available = false
                }
                else{
                    updatedProduct.available = true
                }
            const userProductData = await userProductSchema.updateOne(updatedProduct)
            const productData = await productSchema.updateOne(product);
 */
            if(userProductData && productData)
            {
                const updatedProduct = await userProductSchema.findOne({_id:_id}).populate(
                    {
                        path:'product',
                        populate: {
                          path: 'supplier',
                        }
                    }
                )
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true, message : message.PRODUCT_UPDATED,product : updatedProduct})
            }
            return res  
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({success : false, message : message.FAILED})
        }
        catch(err)
        {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success : false, message : err.message})
        }
    },
    // Get product by id
    getProductById: async (req, res) => {
        try {
            const { id } = req.body
            const userProductData = await userProductSchema.findOne({_id:id}).populate({
                path: 'product',
                populate: {
                  path: 'supplier',
                }
              })
              .exec();
            return res
                    .status(enums.HTTP_CODE.OK)
                    .json({ success : true, message: message.SUCCESS, product: userProductData })
        } catch (error) {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({ success : false, message: error.message })
        }
    },
    useProductByCategory : async (req,res) => {
        try {
            const { category, id } = req.body
            const userProductData = await userProductSchema.find({user : id}).populate({
                path: 'product',
                match: { category },
                populate: {
                  path: 'supplier',
                }
              })
              .exec();
            const filteredUserProductData = userProductData.filter(up => up.product !== null);
            return res
                    .status(enums.HTTP_CODE.OK)
                    .json({ success : true, message: message.SUCCESS, products:filteredUserProductData })
        } catch (error) {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({ success : false, message: error.message })
        }
    }
}