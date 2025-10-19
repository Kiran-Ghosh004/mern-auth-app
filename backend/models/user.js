const mongoose = require('mongoose');

const userSchem= new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
})


const UserModel=mongoose.model('User', userSchem);

module.exports=UserModel;
