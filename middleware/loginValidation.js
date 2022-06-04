module.exports = function () {
    let token = req.query.token;

    jwt.verify(token,'secret', function(err, tokendata){
        if(err){
          return res.status(400).json({message:' Unauthorized request'});
        }
        if(tokendata){
          decodedToken = tokendata;
          next();
        }
    })
  };
