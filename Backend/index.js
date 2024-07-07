const express = require("express")
const app = express()
const Cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

require("dotenv").config()
require("./database")

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(express.static("files"));
app.use(Cors());
app.use('/upload',express.static('upload'));

const productRoutes = require('./routes/product.route')
const suplierRoutes = require('./routes/supplier.route')
const userRoutes = require('./routes/user.route')
const userProductRoutes = require("./routes/userproduct.route")
const categoryRoutes = require("./routes/category.route")

const PORT = process.env.PORT || 3000;

app.use('/product',productRoutes)
app.use('/supplier',suplierRoutes)
app.use('/user',userRoutes)
app.use("/userproduct",userProductRoutes)
app.use("/category",categoryRoutes)


app.get('/',(req, res) => {
    res.send("Welcome to Gulamoyr Girl.")
})


app.listen(PORT, () => {
    console.log(`server is Started on ${PORT} !!`)
})