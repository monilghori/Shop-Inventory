const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //products : [
    //    {
    //        type: mongoose.Schema.ObjectId, ref : 'product'
    //    }
    //]
},
{
    timestamps: true,
    versionKey: false,
    autoCreate: true,
})

const user = new mongoose.model("user",userSchema,'user')
module.exports = user