const express=require('express');
const User=require("../models/usersModel");
const router=express.Router();
const Joi=require('joi');
const genAuthToken = require('../utils/genrateWebTok');
router.post('/',async(req,res)=>{
    const schema=Joi.object({
    email:Joi.string().required().min(12).max(30),
    password:Joi.string().required().min(6).max(20),
    })
    const {error}=schema.validate(req.body);
if(error){
    return res.status(400).send(error.details[0].message);
}
const user=await User.findOne({email:req.body.email});

if(!user){
 
return res.status(400).send("User not found.. please signup");   
}
if(user.password===req.body.password){
    const token=genAuthToken(user);
     res.send(token);
}
else{
    return res.status(400).send("Incorrect Password");
}
});
module.exports=router;
