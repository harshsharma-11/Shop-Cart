const express=require('express');
const {User}=require("../models/usersModel");
const router=express.Router();
const Joi=require('joi');
const genAuthToken = require('../utils/genrateWebTok');
/*********Continue with google********/
router.post('/', async (req, res) => {
    try {
        const { email, email_verified, picture, name } = req.body.jwt_detail;

        if (email_verified) {
            let user = await User.findOne({ email: email });

            if (user) {
                const token = genAuthToken(user);
                res.send(token);
            } else {
                user = new User({
                   name: name,
                    email: email,
                picture: picture,
                password:req.body.jwt_detail.jti,
                });
                user = await user.save();

                const token = genAuthToken(user);
                res.send(token);
            }
        } else {
            return res.status(400).json({ error: 'Email not verified' });
        }
    } catch (error) {
        console.error('Error processing Google OAuth:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports=router;