const productSchema = require("../Models/product.model");
const userSchema = require("../Models/user.model");
const supplierSchema = require("../Models/supplier.model");
const userProductSchema = require("../Models/userproduct.model");

const enums = require("../utils/enums.json");
const message = require("../utils/message.json");

module.exports = {
  addProduct: async (req, res) => {
    try {
      const { name, price, description, image, styleNo, supplier, category } =
        req.body;

      const supplierdata = await supplierSchema.findOne({ _id: supplier });
      if (!supplierdata) {
        return res
          .status(enums.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: message.SUPLIER_NOT_FOUND });
      }
      const product = new productSchema({
        name,
        price,
        description,
        image,
        styleNo,
        supplier,
        category,
      });
      const data = await product.save();
      if (data) {
        return res
          .status(enums.HTTP_CODE.OK)
          .json({ success: true, message: message.PRODUCT_ADDED, data });
      }
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: message.FAILED });
    } catch (error) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    const { id } = req.body;

    try {
      const productdata = await productSchema.findOne({ _id: id });
      if (!productdata) {
        return res
          .status(enums.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: message.PRODUCT_NOT_FOUND });
      }
      return res
        .status(enums.HTTP_CODE.OK)
        .json({ success: true, message: message.PRODUCT_DELETED, data: data });
    } catch (err) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message });
    }
  },
  updateProduct: async (req, res) => {
    const { product } = req.body;
    /* const product = {
            _id:id,
            name,
            price,
            description,
            image,
            styleNo
        } */

    try {
      productSchema
        .updateOne(product)
        .then((data) => {
          return res
            .status(enums.HTTP_CODE.OK)
            .json({ success: true, message: message.PRODUCT_UPDATED, product });
        })
        .catch((err) => {
          return res
            .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: err.message });
        });
    } catch (err) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message });
    }
  },
  getProducts: async (req, res) => {
    try {
      const data = await productSchema
        .find()
        .populate("supplier")
        .populate("category");
      if (data) {
        return res
          .status(enums.HTTP_CODE.OK)
          .json({ success: true, message: message.SUCCESS, products: data });
      }
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: message.FAILED });
    } catch (error) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  },
  getProductByStyleNo: async (req, res) => {
    const { styleNo } = req.body;
    try {
      const product = await productSchema
        .findOne({ styleNo })
        .populate("supplier");
      if (product) {
        return res
          .status(enums.HTTP_CODE.OK)
          .json({ success: true, message: message.SUCCESS, product });
      }
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: message.FAILED });
    } catch (error) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  },
  getProductDetailswithUser: async (req, res) => {
    const { id } = req.body;
    try {
      const product = await productSchema
        .findOne({ _id: id })
        .populate("supplier")
        .populate("category");
      const userWithProduct = await userProductSchema
        .find({ product: id })
        .populate("user");
      if (product) {
        return res
          .status(enums.HTTP_CODE.OK)
          .json({
            success: true,
            message: message.SUCCESS,
            product,
            user: userWithProduct,
          });
      }
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: message.FAILED });
    } catch (error) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  },
  productByCategory: async (req, res) => {
    const { category } = req.body;
    try {
      const products = await productSchema
        .find({ category })
        .populate("supplier");
      if (products) {
        return res
          .status(enums.HTTP_CODE.OK)
          .json({ success: true, message: message.SUCCESS, products });
      }
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: message.FAILED });
    } catch (error) {
      return res
        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  },
};
