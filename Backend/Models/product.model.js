const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    image : {
        type: String,
        default : "https://www.proclinic-products.com/build/static/default-product.30484205.png"
    },
    styleNo : {
        type: String,
        required: true,
    },
    supplier : {
        type: mongoose.Schema.ObjectId, ref: 'supplier',
        required : true
    },
    Totalquantity: {
        type: Number,
        required: true,
        default : 0
    },
    category : {
        type: mongoose.Schema.ObjectId, ref: 'category',
        required : true
    }
},
{
    timestamps: true,
    versionKey: false,
    autoCreate: true,
})

const product = new mongoose.model("product",productSchema,"product")
module.exports = product