const express = require('express');
const router = new express.Router();
const Auth = require('../middleware/Auth');
const User = require('../models/User');
//<-----------------Create-User-Route----------------->
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save()
        const token = await user.generateAuthToken();
        res.status(200).send({
            user,
            token
        });
    } catch (e) {
        res.status(500).send(e)
    }
})
router.get('/userinfo', Auth, async (req, res) => {
    res.send(req.user)
})
//<-----------------Logout-User-Route------------------>
router.get('/logout', Auth ,async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})
//<-----------------Login-User-Route------------------>
router.post('/login',async(req,res)=>{
    try{
       const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken()
        res.status(200).send({
            user,
            token
        });
       
    }catch(e){
       res.status(500).send(e)
    }
})
module.exports=router;