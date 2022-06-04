const { request } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');

const Orders = require('../models/Order');



var router = express.Router();
const config = require('../config.json')
const authm = require('../middleware/auth');
const { default: mongoose } = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');

const auth = (req, res, next) => {
    if (req.headers && req.headers[config.HeaderAPIUser]) {
        let usr =  jwt.verify(req.headers[config.HeaderAPIUser], 'secret');
        if (usr && usr.username) {
            res.locals.username = usr.username;            
            // res.set(config.HeaderAPIUser);
            return next();
        } else {
            return res.status(401).json({ result: false, authentication: false });
        }
    } else {
        return res.status(401).json({ result: false, authentication: false });
    }
}



// router.get('/', (req, res) => {
//     Orders.find((err, docs) => {
//         if(!err){ res.send(docs); }
//         else{ console.log("error: " + JSON.stringify(err, undefined,2)); }
//     });
// });

// router.get('/:id', async (req, res) => {
//     const singleOrder = await Order.findOne({ _id: req.params.id }).then(r=>{return r}).catch(e=>{return false});
//     if(singleOrder){
//         res.json({ result: true, data: singleOrder})
//     }else{
//         res.json({ result: false });
//     }   
// });


router.post('/', auth, async (req, res) => {
    

    productOrder = [];
    totalPrice = 0;
    req.body.product.forEach(element => {        
        productOrder.push({id: element['_id'], title: element['title'], costPeritem: element['costPeritem'],defultPrice: element['defultPrice'], unit: element['unit'] });
        totalPrice = totalPrice + element['costPeritem'];
    });

    console.log(totalPrice);
    
    const customer = await User
        .findOne({
            username:res.locals.username || ""
        })
        .then((r) => {
            return r ? r._id : "";
        })
        .catch((e) => {
            return "";
        });  
  


    var orders = new Orders({
        userId:  customer._id,
        paymentType:  req.body.payment,
        products: productOrder,       
        price: totalPrice,   
        orderAddress:  req.body.orderAddress
    });


    orders.save((errs, docs) => {
        if(errs){
            console.log(errs);
            res.send({status: "false"});
        } else {
            res.send({status: "true"});
        }
    });


    
    
});




module.exports = router;