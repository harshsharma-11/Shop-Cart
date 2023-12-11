const {Cart, CartProduct} = require('../models/cartModel');

const User =require('../models/usersModel');
module.exports.fetchcart = async (req, res) => {
  try {
    console.log("fetchcart");
    
    const user=await User.findOne({_id:req.body.userId});
  
    const cart = await Cart.findOne({ user:user }); // Make sure to have userId defined
    if (!cart) {
      console.log('cart not found');
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



/*********************************************************** */

module.exports.addtocart = async (req, res) => {
  try {
    console.log("addtocart");
    
    const user=await User.findOne({_id:req.body.userId});
    const cart = await Cart.findOne({ user:user }); // Make sure to have userId defined
    //cart nhi  h user ki
    if (!cart) {
      console.log('cart not.. found');
      new_cart=new Cart({
        user:user,
        amount:0,
        quantity:0,
        items:[],
    });
    await new_cart.save();
    const newProduct = new CartProduct({
      product:req.body.product,
      name:req.body.product.name,
      price:req.body.product.price,
      image:req.body.product.image,
      product_quantity: 1,
    });
    await newProduct.save();
    console.log("newproduct",newProduct);
    new_cart.items.push(newProduct);
      new_cart.amount += req.body.product.price;
      new_cart.quantity += 1;
      await new_cart.save();
      return res.status(200).json({ messsage: 'new Cart created' });
    }
    
//agr cart h user ki*****************************************
    console.log('cart found and  adding to cart');

    const cartProduct = cart.items.find((item) => {//console.log(item.product.toString());
      return item.product.toString() === req.body.productId});
//phle se cart me vo product h 
    if (cartProduct) {
      console.log('cart product already in cart');
      cart.amount +=req.body.product.price;
      cart.quantity += 1;
      cartProduct.product_quantity += 1;
    } 
    else {
      
      console.log('cart product not in cart');
      console.log(req.body.product);
      const newProduct = new CartProduct({
        product: req.body.product,
        name:req.body.product.name,
        price:req.body.product.price,
        image:req.body.product.image,
        product_quantity: 1,
      });
      cart.items.push(newProduct);
      cart.amount += req.body.product.price;
      cart.quantity += 1;
    }

    await cart.save();

    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


/************************************************* */
module.exports.removefromcart=async(req,res)=>{
try{
  
  const user=await User.findOne({_id:req.body.userId});
  const cart = await Cart.findOne({ user:user }); // Make sure to have userId defined

  const newPrice=cart.amount-(req.body.propri*req.body.proqty);
 
  const  newQuantity=cart.quantity-req.body.proqty;
  console.log(newPrice,newQuantity);
    const result = await Cart.updateOne(
      { user: user },
      { $pull: { items: { product: req.body.productId }  },
       $set: { 'amount': newPrice,'quantity':newQuantity } },
      
    );
    if (result.nModified === 0) {
      console.log('Item not found in the cart' );
    }
  const crt = await Cart.findOne({ user:user }); // Make sure to have userId defined

    console.log("updated",crt);


    res.status(200).json({ message: 'Item updated successfully' });
}
catch(err){
  console.log(err);
  res.status(500).json({error:'internal server Error'});
}
}

/********************************************************************** */
module.exports.incrementproduct=async(req,res)=>{
  try{

  if(req.body.proqty>4){
    res.status(500).json({error:'max product should be 5'});
  }
  else{
  const user=await User.findOne({_id:req.body.userId});
  const cart = await Cart.findOne({ user:user }); // Make sure to have userId defined

  const cartProduct = cart.items.find((item) => {//console.log(item.product.toString());
    return item.product.toString() === req.body.productId});
    
console.log("init",cart);
  const newPrice=cart.amount+(req.body.propri);
  const  newQuantity=cart.quantity+1;

  const result = await Cart.updateOne(
    { user: user ,'items._id': cartProduct._id },
    { $set: { 'amount': newPrice,'quantity':newQuantity ,'items.$.product_quantity': req.body.proqty+1,} }, 
  );
  
 
  res.status(200).json({ message: 'Item updated successfully' });
  }
}
  catch(err){

    console.log(err);
    res.status(500).json({error:'internal server Error'});
  }
}


/***************************************************************** */
module.exports.decrementproduct=async(req,res)=>{
  try{
    if(req.body.proqty<2){
      res.status(500).json({error:'min product should be 1'});
    }
    else{
  const user=await User.findOne({_id:req.body.userId});
  const cart = await Cart.findOne({ user:user }); // Make sure to have userId defined

  
  const cartProduct = cart.items.find((item) => {//console.log(item.product.toString());
    return item.product.toString() === req.body.productId});
    
  
  const newPrice=cart.amount-(req.body.propri);
  const  newQuantity=cart.quantity-1;

  const result = await Cart.updateOne(
    { user: user,'items._id': cartProduct._id },
    { $set: { 'amount': newPrice,'quantity':newQuantity ,'items.$.product_quantity': req.body.proqty-1} },
  
    
  );


  res.status(200).json({ message: 'Item updated successfully' });
  }
}
  catch(err){

    console.log(err);
    res.status(500).json({error:'internal server Error'});
  }
}