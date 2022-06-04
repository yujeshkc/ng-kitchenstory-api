const { request } = require('express');
const express = require('express');
const Category = require('../models/Category');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;



router.get('/', (req, res) => {
    Category.find((err, docs) => {
        if(!err){ res.send(docs); }
        else{ console.log("error: " + JSON.stringify(err, undefined,2)); }
    });
});

router.get('/:id', async (req, res) => {
    const singleCategory = await Category.findOne({ _id: req.params.id });
    if(singleCategory){
        res.json({ result: true, data: singleCategory})
    }else{
        res.json({ result: false });
    }   
});

router.post('/', (req, res) => {
    var category = new Category({
        title: req.body.title,        
        slug: req.body.slug,
        seoTitle: req.body.seoTitle,
        seoDescription: req.body.seoDescription,
        summary: req.body.summary,
        icon: req.body.icon,
        image: req.body.image,        
        publishOn: req.body.publishOn,
        modifyOn:req.body.modifyOn
    });
    category.save((err,docs) => {
        if(!err){ res.send(docs);}
        else{ res.send("error: " + JSON.stringify(err, undefined,2)); }
    });
});


router.patch('/:id', async(req, res) => {

    Category.findByIdAndUpdate(req.params.id,{
        $set:obj
    },{setDefaultsOnInsert:true}).then(r=>{
        res.json({result:true})
    }).catch(e=>{
        res.json({e})
    })
});



module.exports = router;