let mongoose = require('mongoose');
const commonConfig = require('../config.json');
const { schema } = require('./Category');
const Product = require('./Product');
const User = require('./User');

Schema = mongoose.Schema;

// var OrderProduct = new Schema({
//     id           :Number,
//     title        :String,
//     costPeritem  :Number,
//     defultPrice  :Number,
//     unit         :String,

// });

var OrderSchema = new Schema({
    id: Number,
    userId: [
        {type: mongoose.Schema.Types.ObjectId, ref:'User'}
    ],
    products: { type: [{
        id           :String,
        title        :String,
        costPeritem  :Number,
        defultPrice  :Number,
        unit         :String,
    }],
        require: true
    },
    price: Number,
    orderDate: {
        type: Date,
        default: Date.now,
    },
    quantity: Number,
    orderAddress: String,
    orderStatus: {
        type: String,
        default: 'new',
    },
    paymentType: {type: String, required: true},
    publishOn:{
        type: Date,
        default: Date.now,
    },
    modifyOn:{
        type: Date,
        default: Date.now,
    }
});


const Orders = mongoose.model('Order', OrderSchema);

module.exports = Orders;

