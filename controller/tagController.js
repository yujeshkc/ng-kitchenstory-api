const { request } = require('express');
const express = require('express');
const Tag = require('../models/Tag');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;



router.get('/', (req, res) => {
    Tag.find((err, docs) => {
        if(!err){ res.send(docs); }
        else{ console.log("error: " + JSON.stringify(err, undefined,2)); }
    });
});

router.get('/:id', async (req, res) => {
    const singleTag = await Tag.findOne({ _id: req.params.id });
    if(singleTag){
        res.json({ result: true, data: singleTag})
    }else{
        res.json({ result: false });
    }   
});

router.post('/', (req, res) => {
    var tag = new Tag({
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
    tag.save((err,docs) => {
        if(!err){ res.send(docs);}
        else{ res.send("error: " + JSON.stringify(err, undefined,2)); }
    });
});


router.patch('/:id', async(req, res) => {

    Tag.findByIdAndUpdate(req.params.id,{
        $set:obj
    },{setDefaultsOnInsert:true}).then(r=>{
        res.json({result:true})
    }).catch(e=>{
        res.json({e})
    })
});



module.exports = router;