const { request } = require('express');
const express = require('express');
const User = require('../models/User');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;







router.post('/', (req, res) => {
    var user = new User({
        username: req.body.username,
        fullName: req.body.fullName,
        email: req.body.email,   
        password: User.hashPassword(req.body.password),        
        publishOn: Date.now()        
    });

    let promise = user.save();
    promise.then(function(doc){
        return res.status(201).json(doc);
    });    
   
});




module.exports = router;