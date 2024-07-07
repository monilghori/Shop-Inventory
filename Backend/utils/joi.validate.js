const Joi = require("joi")
const enums = require("../utils/enums.json")

module.exports = {

    validate4signup : (req, res, next) => {

        let schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })

        let {error} = schema.validate(req.body)

        if(error)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false, message : error.details[0].message})
            }
            else{
                next();
            }
    },

    validate4login : (req, res, next) => {

        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })

        let { error } = schema.validate(req.body)

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validate4suplier : (req, res, next) =>
    {
        let schema = Joi.object().keys({
            name: Joi.string().required()
        })

        let { error } = schema.validate(req.body)

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },

    validate4deletesuplier : (req, res, next) =>
    {
        let schema = Joi.object().keys({
            id: Joi.string().required()
        })

        let { error } = schema.validate(req.body)

        if (error) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: error.details[0].message });
        } else {
            next();
        }
    },
    validate4updatesuplier : (req, res, next) => 
        {
            let schema = Joi.object().keys({
                id: Joi.string().required(),
                name: Joi.string().required()
            })

            let { error } = schema.validate(req.body)

            if (error) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: error.details[0].message });
            } else {
                next();
            }
        },
        validate4addproduct : (req, res, next) => {
            let schema = Joi.object().keys({
                name: Joi.string().required(),
                price: Joi.number().required(),
                description: Joi.string().required(),
                image: Joi.string().required(),
                styleNo: Joi.string().required(),
                supplier: Joi.string().required(),
                category: Joi.string().required()
            })

            let { error } = schema.validate(req.body)

            if (error) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: error.details[0].message });
            } else {
                next();
            }
        },

        validate4addUserProduct : (req, res, next) => {
            let schema = Joi.object().keys({
                user: Joi.string().required(),
                product: Joi.string().required(),
                quantity: Joi.number().required(),
                color: Joi.string().required()
            })

            let { error } = schema.validate(req.body)

            if (error) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: error.details[0].message });
            } else {
                next();
            }
        }
    

}