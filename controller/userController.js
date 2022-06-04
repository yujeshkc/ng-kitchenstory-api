const { request } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

var router = express.Router();

const config = require('../config.json')
const authm = require('../middleware/auth');
const { default: mongoose } = require('mongoose');


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

router.get('/',auth, (req, res) => {
    User.find((err, docs) => {
        if(!err){ res.send(docs); }
        else{ console.log("error: " + JSON.stringify(err, undefined,2)); }
    });
});

router.get('/:id', auth, async (req, res) => {
    const singleUser = await User.findOne({ _id: req.params.id });
    if(singleUser){
        res.json({ result: true, data: singleUser})
    }else{
        res.json({ result: false });
    }   
});

router.post('/', auth, (req, res) => {
    var user = new User({
        usergroup: req.body.usergroup,
        username: req.body.username,
        fullName: req.body.fullName,
        email: req.body.email,   
        password: User.hashPassword(req.body.password),
        country: req.body.country,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        publishOn: req.body.publishOn,
        modifyOn: req.body.modifyOn
});
   
    let promise = user.save();

    promise.then(function(doc){
        return res.status(201).json(doc);
    });

         // user.save((err,docs) => {
        //     if(!err){ res.send(docs);}
        //     else{ res.send("error: " + JSON.stringify(err, undefined,2)); }
        // });
   
   
});

router.post('/register',auth, function(req, res, next){
    
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
})


router.put('/:id', auth, async(req, res) => {
    
    const checkUser = await User.findOne({ _id: req.params.id });

    if(checkUser) {
        await User.findByIdAndUpdate(req.params.id,{
            $set: {
                usergroup: req.body.usergroup,
                username: req.body.username,
                fullName: req.body.fullName,
                email: req.body.email,   
                password: User.hashPassword(req.body.password),
                country: req.body.country,
                streetAddress: req.body.streetAddress,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode,
                publishOn: req.body.publishOn,
                modifyOn: req.body.modifyOn
            }
        },{setDefaultsOnInsert:true}).then(r=>{
            res.json({result:true})
        }).catch(e=>{
            res.json({e})
        })
    } else {
        return res.status(404).json("{'result': 'not found'}");
    }

    
});


router.delete('/:id', auth, async(req, res) =>{
    return  User.findOneAndDelete({_id: req.params.id})
    .exec()
    .then((counter) => {
        return res.json({status:"true"});
    })
    .catch((err)=>next(err));
})





module.exports = router;