const express = require('express');
const mongoose = require('mongoose');
const User = require('../lib/models/user');
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

/*User register*/
router.post('/signup',(req,res,next)=>{
    if(!req.body){
        res.status(403)
        .json({error: true, message: "Empty body"});   
    }

    let _user = req.body;

         new User({
                    username: _user.username,
                    email: _user.email,
                    password: encrypt( _user.password),
                    password_confirmation: encrypt(_user.password_confirmation)
                }).save()
                .then((newuser)=>{
                    res.status(201)
                    .json({user: newuser});
               })
               .catch((err)=>{
                    res.status(200)
                    .json({error: err.errmsg});
               });
});

module.exports = router;