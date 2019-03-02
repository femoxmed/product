const mongoose = require('mongoose')
const Joi = require('joi');
JoiobjectId = require('joi-objectid')(Joi);
const { categorySchema } = require('../models/category')

const productSchema = new mongoose.Schema({
    // ID: { type: String, required: true },
    Name: { type: String, required: true },
    Description: { type: String, required: true },
    Price: { type: String, required: true },
    Category: categorySchema,
    Image: { type: String },
    Color: { type: Array, required: true },
    filename: String,




})

const imageSchema = new mongoose.Schema({
    image: { type: Buffer, contentType: String },
    filename: String,
    desc: String,
})

const Image = mongoose.model('Images', imageSchema)
const Product = mongoose.model('products', productSchema)

//using joi module to validate users from input
function productValidation(reqbody) {
    schema = {
        // ID: Joi.string().min(2).max(256),
        Name: Joi.string().min(2).max(256).required(),
        Description: Joi.string().min(2).max(256).required(),
        Price: Joi.string().min(2).max(256).required(),
        categoryid: Joi.string(),
        Color: Joi.string().min(2).max(256).required(),
    }

    return Joi.validate(reqbody, schema)
}



module.exports = { Product, productValidation, Image }