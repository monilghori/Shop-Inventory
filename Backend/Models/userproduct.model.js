const mongoose = require("mongoose")

const userProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId, ref: 'user'
    },
    product: {
        type: mongoose.Schema.ObjectId, ref: 'product'
    },
    quantity: {
        type: Number,
        required: true
    },
    available : {
        type: Boolean,
        required: true,
        default : true
    },
    size : {
        type: String,
    },
    color: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
    versionKey: false,
    autoCreate: true
})

const userProduct = new mongoose.model("userProduct",userProductSchema,"userProduct")

module.exports = userProduct