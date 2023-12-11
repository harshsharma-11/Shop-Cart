const User=require('../models/usersModel');
const express=require('express');
const router=express.Router();

router.post('/',async(req,res)=>{
    try{
   await User.updateOne({_id:req.body._id}, {
        email:req.body.email,
        name:req.body.name,
        image:req.body.image,
    }, function(err, res) {

    });
    
    res.status(200).json({ message: 'User updated successfully' });
}
catch(err){
    res.status(400).json(err);
}
})
module.exports=router;