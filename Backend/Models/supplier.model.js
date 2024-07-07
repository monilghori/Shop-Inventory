const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true,
        versionKey : false,
        autoCreate : true
    }
)

const supplier = new mongoose.model('supplier',supplierSchema,'supplier')
module.exports = supplier
