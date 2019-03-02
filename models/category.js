const mongoose = require('mongoose');
const Joi = require('joi')


const categorySchema = new mongoose.Schema({
    category: { type: String, required: true }
})

const Category = mongoose.model('category', categorySchema);


function categoryVal(reqbodyname) {
    schema = {
        category: Joi.string().min(2).max(256).required()
    }

    return Joi.validate(reqbodyname, schema)
}

module.exports = { Category, categoryVal, categorySchema }