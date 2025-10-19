const UserModel = require("../models/user");
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const singnup= async (req, res) => {
    try{
        const {name,email,password}=req.body;
        const user= await UserModel.findOne({email:email});
        if(user){
            return res.status(409).send({message:"User already exists",sucess:false});
        }
        const newUser=new UserModel({name,email,password});
        newUser.password=await bcrypt.hash(password,10);

        await newUser.save();
        res.status(201).send({message:"User registered successfully",sucess:true});


    } catch(error){
        res.status(500).send({message:"Error in Registering user", error:error.message,sucess:false});
    }
    
} ;

const login= async (req, res) => {
    try{
        const {email,password}=req.body;
        const user= await UserModel.findOne({email:email});
        if(!user){
            return res.status(403).send({message:"email is wrong",sucess:false});
        }
        const isPasswordValid= await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(403).send({message:" password not correct",sucess:false});
        }
        const jwtToken=jwt.sign({id:user._id},process.env.secrete_key,{expiresIn:'3h'});
        res.status(200).send({message:"Login successful",sucess:true,token:jwtToken,email,name:user.name});

       
        

    } catch(error){
        res.status(500).send({message:"Error in Registering user", error:error.message,sucess:false});
    }
    
} ;

module.exports={singnup,login};
