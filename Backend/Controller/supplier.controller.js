const suplierSchema = require("../Models/supplier.model")

const enums = require("../utils/enums.json")
const message = require("../utils/message.json")

module.exports = {

    createSuplier : async (req, res) => {
        const suplier = new suplierSchema({
            name : req.body.name
        })

        suplier.save()
        .then(data => {
            return res
                    .status(enums.HTTP_CODE.OK)
                    .json({success : true, message : message.SUPLIER_ADDED, supplier : data})
        })
        .catch(err => {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success : false, message : err.message})
        })
    },
    deleteSuplier : async (req, res) => {
        const { id } = req.body

        try{
            suplierSchema.findByIdAndDelete(id)
            .then(data => {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true, message : message.SUPLIER_DELETED, supplier : data})
            })
            .catch(err => {
                return res
                        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                        .json({success : false, message : err.message})
            })
        }
        catch(err)
        {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success : false, message : err.message})
        }
    },
    updateSuplier : async(req, res) => {
        const { id , name} = req.body
        const suplier = {
            _id:id,
            name
        }

        try{
            suplierSchema.findByIdAndUpdate(suplier)
            .then(data => {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true, message : message.SUPLIER_UPDATED, supplier : data})
            })
            .catch(err => {
                return res
                        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                        .json({success : false, message : err.message})
            })
        }
        catch(err)
        {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success : false, message : err.message})
        }
    },
    getAll : async (req, res) => {
        try{
            suplierSchema.find()
            .then(data => {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true, message : message.SUCCESS, suppliers : data})
            })
            .catch(err => {
                return res
                        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                        .json({success : false, message : err.message})
            })
        }
        catch(err)
        {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success : false, message : err.message})
        }
    }
}