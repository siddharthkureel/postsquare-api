const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Post = require('./Post');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowercase: true,
        validate(value) {
            if (!isEmail(value)) {
                throw new Error('email is not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('cannot set password as it is')
            }
        }
    },
    address: {
        type: String,
        required:true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps:true
})
schema.methods.toJSON = function(){
    const {email,name,address,_id} = this;
    return {
        email,
        name,
        address,
        id:_id
    }
}
schema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'BlogSpotAppBySiddharthKureel')
    user.tokens = user.tokens.concat({ token: token });
    user.save();
    return token
}
schema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error('unable to log in');
    }
    const match = bcrypt.compareSync(password,user.password);
    if(!match){
        throw new Error('unable to log in');
    }
    return user
}
//function is used to get the dynamic value of this 
schema.pre('save', async function(next){
    //this is user instance
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8);
    }
    next();
})
//
schema.pre('remove', async function (next) {
    const user = this;
    await Post.deleteMany({ userId: user._id });
    next();
})
const User = mongoose.model('User',schema);
module.exports = User;
