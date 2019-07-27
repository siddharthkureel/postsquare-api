const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Post'
    },
    users:[{
        userName:{
            type:String
        },
        userId:{
            type:String
        }
    }]
});
// schema.statics.incrementLike=async function(postId){
//    await 
// }
const Likes = mongoose.model('Likes',schema);
module.exports = Likes;
