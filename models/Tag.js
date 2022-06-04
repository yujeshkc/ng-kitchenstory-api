let mongoose = require('mongoose');
const commonConfig = require('../config.json');


Schema = mongoose.Schema;

var tagSchema = new Schema({
    ID: Number,
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        min: [1, 'Slug length too small'],
        unique: true
    },
    Image:[],
    icon: String,
    seoTitle: String,
    seoDescription: String,
    summary: String, 
    publishOn:Date,
    modifyOn:Date 

})

const Tag = mongoose.model('Tag', tagSchema, 'Tag');

module.exports = Tag;