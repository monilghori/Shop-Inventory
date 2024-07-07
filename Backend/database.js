const mongoose = require('mongoose')

const mongo = mongoose.connect("mongodb+srv://monilghori:monil343@project.dblil8c.mongodb.net/",{socketTimeoutMS: 0}).catch((err) => {console.log(err)});

module.exports = mongo