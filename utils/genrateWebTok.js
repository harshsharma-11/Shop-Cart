const jwt=require("jsonwebtoken");
const env=require('../config/environment')
const genAuthToken=(user)=>{
    const secretKey=env.secret_key;
const token=jwt.sign({
    _id:user.id,
    name:user.name,
    email:user.email,

},
secretKey);
return token;
};
module.exports=genAuthToken;