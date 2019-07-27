const express = require('express');
const router = new express.Router();
const Post = require('../models/Post');
const Likes = require('../models/Likes');
//<-----------------Create-User-Route----------------->
router.post('/posts', async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.send(post);
        const like = new Likes({postId:post._id});
        await like.save();
    } catch (e) {
        res.status(500).send(e)
    }
})
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.send(posts);
    } catch (e) {
        res.status(500).send(e)
    }
})
router.patch('/posts/:id',async(req,res)=>{
    try {
        const post = await Post.findOne({ _id: req.params.id});
        const validField = Object.keys(req.body);
        validField.forEach((value) => {
            post[value] = req.body[value]
        });
        await post.save();
        res.send(post)
    } catch (error) {
        
    }
})
router.get('/posts/:id',  async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        if (!post) {
            return res.status(404).send('not found')
        }
        res.status(200).send(post)
    } catch (e) {
        res.status(500).send(e)
    }
})
router.delete('/posts/:id',async(req,res)=>{
    try {
        const post = await Post.findOne({ _id: req.params.id });
        await post.remove()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})
module.exports = router;