const express=require('express');
const {User}=require("../models/usersModel");
const router=express.Router();
const Joi=require('joi');
var nodemailer = require('nodemailer');
const jwt=require("jsonwebtoken");
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


/************************* */
router.post('/forgot-password',async(req,res)=>{
    // const schema=Joi.object({
    //     email:Joi.string().required().min(12).max(30),
    //     })
    //     const {error}=schema.validate(req.body);
    //     if(error){
    //         return res.status(400).send(error.details[0].message);
    //     }

const user=await User.findOne({email:req.body.email})
.then(user=>{
    if(!user){
        res.send({Status:"user not existed"});
    }
    const token=jwt.sign({id:user._id},"jwt_secret_key_xyz_pqr_abc",{expiresIn:"1D"});
    


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'harshsharma90153@gmail.com',
    pass: 'harsh@88940'
  }
});

var mailOptions = {
  from: 'harshsharma90153@gmail.com',
  to: 'harshsharma85134@gmail.com',
  subject: 'Reset Your PassWord',
  text: `http://localhost:8071/reset-password/${user._id}/${token}`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
})
})



/*****************/
router.post('/reset-password',async(req,res)=>{
    const {id,token}=req.params;
const {password}=req.body;
jwt.verify(token,"jwt_secret_key_xyz_pqr_abc",(err,decoded)=>{
    if(err){
        res.send({Status:"Something went wrong"});
    }
    else{
        
        const result=User.findByIdAndUpdate({_id:id},{password:password});
        if(result){
            res.send({Status:"success"});
        }
        else{
            
        res.send({Status:"Something went wrong"});
        }
    }
})
})
module.exports=router;
