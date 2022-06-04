const { request } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const escapeStringRegexp = require('escape-string-regexp');

const Product = require('../models/Product');



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



router.get('/', (req, res) => {
    if(req.query.s){
        console.log(req.query.s);
        const $regex = escapeStringRegexp(req.query.s);
        Product.find({"title": {$regex: new RegExp(req.query.s, "i")}}, (err, docs) => {
            if(!err){ res.send(docs); }
            else{ console.log("error: " + JSON.stringify(err, undefined,2)); }
        });
    } else {
        Product.find((err, docs) => {
            if(!err){ res.send(docs); }
            else{ console.log("error: " + JSON.stringify(err, undefined,2)); }
        });
    }
    
});

router.get('/:id', async (req, res) => {
    const singleProduct = await Product.findOne({ _id: req.params.id }).then(r=>{return r}).catch(e=>{return false});
    if(singleProduct){
        res.json({ result: true, data: singleProduct})
    }else{
        res.json({ result: false });
    }   
});


router.post('/', auth, (req, res) => {
    var product = new Product({
        title: req.body.title,
        summary: req.body.summary,
        slug: req.body.slug,
        seoTitle: req.body.seoTitle,
        seoDescription: req.body.seoDescription,
        defultPrice: req.body.price,
        detail: req.body.detail,
        costPerItem:  req.body.costPerItem,
        showComparePrice: req.body.showComparePrice,
        comparePrice: req.body.comparePrice,
        costPeritem:req.body.costPeritem,
        unit:req.body.unit,
        image:req.body.image,
        inStock: req.body.inStock,
        status: req.body.status ,
        Category: req.body.category,
        Tag: req.body.tag,
        publishOn: req.body.publishOn,
        modifyOn:req.body.modifyOn
    });

    if(req.params.id) {
        Product.findByIdAndUpdate(req.params.id,{
            $set:obj
        },{setDefaultsOnInsert:true}).then(r=>{
            res.json({result:true})
        }).catch(e=>{
            res.json({e})
        })
    } else {
        product.save((err,docs) => {
            //console.log(req);
            if(!err){ res.send(docs['_id']);}
            else{ res.send("error: " + JSON.stringify(err, undefined,2)); }
        });
    }
    
});


router.put('/:id', auth, async(req, res) => {
    let obj = req.body;
    await Product.findByIdAndUpdate(req.params.id,{
        $set: {
            title: req.body.title,
            summary: req.body.summary,
            slug: req.body.slug,
            seoTitle: req.body.seoTitle,
            seoDescription: req.body.seoDescription,
            defultPrice: req.body.price,
            detail: req.body.detail,
            costPerItem:  req.body.costPerItem,
            showComparePrice: req.body.showComparePrice,
            comparePrice: req.body.comparePrice,
            costPeritem:req.body.costPeritem,
            unit:req.body.unit,
            image:req.body.image,
            inStock: req.body.inStock,
            status: req.body.status,
            Category: req.body.category,
            Tag: req.body.tag,
            publishOn: req.body.publishOn,
            modifyOn:req.body.modifyOn
        }
    },{setDefaultsOnInsert:true}).then(r=>{
        res.json({result:true})
    }).catch(e=>{
        res.json({e})
    })
});


router.delete('/:id', auth, async(req, res) =>{
    Product.findByIdAndRemove(req.params.id).then((review) => {
        return true;
    }).catch((err) => {
        console.log(err.message);
    })
})



module.exports = router;