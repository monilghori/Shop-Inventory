const { default: mongoose } = require('mongoose')
const userSchema = require('../Models/user.model')
const enums = require('../utils/enums.json')
const message = require('../utils/message.json')

const bcrypt = require("bcryptjs")


module.exports = {

    login : async (req, res) => {
        
        const {email, password} = req.body

        try{
            const user = await userSchema.findOne({email : email})
            
            if(!user)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success:false , message: message.USER_NOT_FOUND})
            }

            const isMatch = await bcrypt.compare(password,user.password)

            if(!isMatch)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success:false , message: message.WRONG_PASSWORD})
            }
            return res
                    .status(enums.HTTP_CODE.OK)
                    .json({success:true, message : message.LOGIN_SUCCESS, user})
        }catch(err)
        {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success:false , message: err.message})
        }
    },
    signup : async (req, res) => {
        const {name, email, password} = req.body

        try{
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password,salt)
            const user = {
                name,
                email,
                password : hash
            }
            const newUser = await userSchema.create(user)

            if(newUser)
            {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success:true , message: message.SIGNUP_SUCCESS,user})
            }
        }
        catch(err)
        {
            return res
                    .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success:false , message: err.message})
        }
    },
    getall : async (req,res) => 
        {
            try{
                const users = await userSchema.find()
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success:true , message: message.SUCCESS, users})
            }
            catch(err)
            {
                return res
                        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                        .json({success:false , message: err.message})
            }
        }
}