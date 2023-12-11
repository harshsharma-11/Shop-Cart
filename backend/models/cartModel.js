const mongoose=require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId,
         ref: 'Product', 
         required: true },
         name:{
            type:String,
         },
         image:{
            type:String,
                },
               
               
                price:{
                    type:Number,
                },
    product_quantity: { type: Number, required: true },
  });


const cartSchema=new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true },
quantity:{
    type:Number,
},
amount:{
    type:Number,
},

    items: [cartItemSchema], // Use the cartItemSchema for each item in the array


})

const Cart = mongoose.model('Cart', cartSchema);
const CartProduct = mongoose.model('CartProduct', cartItemSchema);

module.exports = { Cart, CartProduct };