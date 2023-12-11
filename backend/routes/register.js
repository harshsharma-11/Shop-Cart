const bcrypt=require('bcrypt');
const Joi=require('joi');
const express=require('express');
const User=require("../models/usersModel")
const genAuthToken = require('../utils/genrateWebTok');
const router=express.Router();

router.post('/',async(req,res)=>{
    //to validate the data comming from front-end
const schema=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required().min(12).max(30),
    password:Joi.string().required().min(6).max(20),

});
const {error}=schema.validate(req.body);
if(error){
    return res.status(400).send(error.details[0].message);
}
let user=await User.findOne({email:req.body.email});
if(user){
    return res.status(400).send("Email already existed..");
}
  user=new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
})

//***************** */
// const salt = 10
// user.password = await bcrypt.hash(req.body.password, salt, function(err, hash) {

//     if (err) {
//       return err;
//     }
//     return hash
//   });

  
user=await user.save(); 
const token=genAuthToken(user);
res.send(token);
})
module.exports=router;