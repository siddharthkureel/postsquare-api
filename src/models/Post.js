const mongoose = require('mongoose');
const Likes = require('./Likes');
const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

schema.pre('remove', async function (next) {
    const post = this;
    await Likes.deleteMany({ postId: post._id });
    next();
})
const Post = mongoose.model('Post',schema)
module.exports = Post;