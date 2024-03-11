const express=require("express");
const port=8070;
const app=express();
const env=require('./config/environment');
const cors=require("cors");
const register=require("./routes/register");
const login=require('./routes/login');
const product=require('./routes/product');
const user=require('./routes/users');
const cart=require('./routes/cart')
const continue_with_google=require('./routes/continue_with_google');
app.use(express.json());
app.use(cors());
/***************************** */
const mongoose=require('mongoose');
const http=require('http');
 const dbUrl=env.db_url;

mongoose.connect(dbUrl)
.then(()=>{
console.info("connected to database");
})
.catch((err)=>{
console.log("error in connecting to the database",err);
})


app.use('/api/register',register);
app.use('/api/login',login);
app.use('/api/continue_with_google',continue_with_google);
app.use('/api/updateUser',user);
app.use('/api/product',product);
app.use('/api/cart',cart);
const products=require("./products");

app.get('/products',(req,res)=>{
res.send(products);

})
app.listen(port,()=>{
    console.log("server is running at port 8070..")
})

//"mongodb+srv://harshsharma90153:KL0FAKHlr7FfSpSd@shopcart.9jtfcoy.mongodb.net/mernProjet?retryWrites=true&w=majority"

//harshsharma90153
//KL0FAKHlr7FfSpSd
//mongodb://localhost:27017

//clien Id 419973489640-dmol338v80h88oe9m61em1qcksvfb68k.apps.googleusercontent.com
//client secret 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