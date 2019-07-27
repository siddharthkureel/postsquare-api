const express = require('express');
const router = new express.Router();
const Likes = require('../models/Likes');

//<-----------------update-like-Route----------------->
router.post('/posts/likes', async (req, res) => {
    try {
        
        const { userId, postId, userName } = req.body;
        const like = await Likes.findOne({ postId });
        like.users.push({userId,userName})
        await like.save()
        res.send(like);
    } catch (e) {
        res.status(500).send(e)
    }
})
router.get('/renderlike/:id', async (req, res) => {
    try {
        const response = await Likes.findOne({ postId: req.params.id})
        res.send(response);
    } catch (e) {
        res.status(500).send(e)
    }
})
module.exports = router;