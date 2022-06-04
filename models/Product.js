let mongoose = require('mongoose');
const commonConfig = require('../config.json');
const Category = require('./Category');
const Tag = require('./Tag');


Schema = mongoose.Schema;

var productSchema = new Schema({
    ID: Number,
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        min: [1, 'Slug length too small'],
        unique: true,
        index: true
    },
    seoTitle: String,
    seoDescription: String,
    summary: String,
    detail: String,
    defultPrice:  Number,
    comparePrice: Number,
    costPeritem: Number,   
    showComparePrice: Boolean,
    image: String,
    unit: String,
    inStock: Boolean,
    status: Boolean,
    Category: String,
    Tag: String,
    // Tag: [Tag],
    // Category: [Category],
    // Image:[],
    // Variation:[],
    publishOn:{
        type: Date,
        default: Date.now,
    },
    modifyOn:{
        type: Date,
        default: Date.now,
    }, 

})

const Product = mongoose.model('Product', productSchema, 'Product');

module.exports = Product;