const express = require('express');
const mongoose = require('mongoose');
const Post = require('../lib/models/post');

var router = express.Router();



//GET all posts
router.get('/',(req,res,next)=>{

    Post.find({}).sort({'created_at': 'desc'}).then((posts)=>{
         res.status(200).json(posts);
    })
    .catch(err => console.log);
   
});

//GET one post
router.get('/:slug', (req,res,next)=>{

    if(!req.params.slug){
        res.status(403)
        .json({error: true, messaga: 'params empty'})
    }

    Post.findOne({slug: req.params.slug})
        .then((post)=>{

            post.views += 1;
            post.save().then((_post)=>{
                res.status(200)
                .json({post : _post});
            }).catch(err => console.log);
            
        })
        .catch(err => res.status(403).json({error: true, messaga: 'bad request'}));

});

//CREATE POST
router.post('/', (req, res, next)=>{

        if(!req.body){
            res.status(403).json({error: true, message: 'body empty'});
        }
        
        let _post = req.body;

        new Post({
            title: _post.title,
            body: _post.body
        }).save()
        .then((_new)=>{
            res.status(201).json({post : _new});
        })
        .catch(err => console.log);

});


module.exports = router;