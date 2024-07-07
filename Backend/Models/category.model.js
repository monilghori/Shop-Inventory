const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
},
{
    timestamps: true,
    versionKey: false,
    autoCreate: true,
})

const category = new mongoose.model("category",categorySchema,"category")
module.exports = category