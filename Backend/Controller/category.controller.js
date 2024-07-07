const enums = require("../utils/enums.json")
const categorySchema = require('../Models/category.model')

module.exports = {
    create : async (req, res) => {
        const { name } = req.body
        try {
            const category = new categorySchema({ name })
            await category.save()
            return res
                    .status(enums.HTTP_CODE.OK)
                    .json({ success: true, message: "Category Created Successfully" })
        } catch (error) {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: error.message })
        }
    },
    getAll : async (req,res) => {
        try {
            const categories = await categorySchema.find()
            return res
                    .status(enums.HTTP_CODE.OK)
                    .json({ success: true, categories })
        } catch (error) {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: error.message })
        }
    }
}
