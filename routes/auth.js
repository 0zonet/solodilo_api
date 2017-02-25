const express = require('express');
var router = express.Router();
const config = require('../lib/config/config');
const crypto = require('crypto'),
      algorithm = 'aes-256-ctr',
      password = config.secret;

function  encrypt(text){
    let cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}


router.post('/login',(req,res,next)=>{

        if(!req.body){
            res.status(403)
                .json({error: 'body empty'});
        }

        let _user = req.body;


});

module.exports = router;