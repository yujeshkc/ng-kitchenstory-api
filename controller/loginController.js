const { request } = require('express');
const express = require('express');
const User = require('../models/User');
var router = express.Router();
const config = require('../config.json')

const jwt = require('jsonwebtoken');






router.post('/', (req, res, next) => {
   
  // find by username not email 
   let promise = User.findOne({username:req.body.username}).exec();

   promise.then(function(data){
   
   if(data) {
      if(data.isValid(req.body.password)){
          // generate token
          let result = [];
          let token = jwt.sign({username:data.username},'secret', {expiresIn : '3h'});
          let user = {"username": data.username, "role": data.usergroup};
          result.push({"token":token});
          result.push(user);
          res.cookie(config.CookieB, token, { httpOnly: true });
          // console.log(result);
          return res.status(200).json(result);
      } else {
        return res.status(501).json({message:' Invalid Credentials'});
      }
    }
    else {
      return res.status(501).json({message:'Invalid Credentials a'})
    }
   });

   promise.catch(function(err){
     return res.status(501).json({message:'Some internal error'});
   })
   
});


module.exports = router;