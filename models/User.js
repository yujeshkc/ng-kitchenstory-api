let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
const commonConfig = require('../config.json');


Schema = mongoose.Schema;

var userSchema = new Schema({
    ID: Number,
    usergroup: {
        type: String,
        enum : ['admin','user', 'customer'],
        required: true,  
        default: 'user'     
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },   
    password: {
        type: String,
        required: true
    },
    fullName: String, 
    country:String,
    city:String,
    state:String,
    resetToken: String,
    zipCode:String,
    status: String,  
    streetAddress: String,
    publishOn:{
        type: Date,
        default: Date.now,
    },
    modifyOn:{
        type: Date,
        default: Date.now,
    }, 

});


userSchema.statics.hashPassword = function hashedPassword(password){
    return bcrypt.hashSync(password, 10);
}

userSchema.methods.isValid = function(hashedPassword){
    return bcrypt.compareSync(hashedPassword, this.password);
}

const User = mongoose.model('User', userSchema, 'User');

module.exports = User;