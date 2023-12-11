const jwt=require("jsonwebtoken");
const genAuthToken=(user)=>{
    const secretKey="secretkey123456";
const token=jwt.sign({
    _id:user.id,
    name:user.name,
    email:user.email,

},
secretKey);
return token;
};
module.exports=genAuthToken