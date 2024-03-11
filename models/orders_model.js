const mongoose=require('mongoose');

// const orderItemSchema = new mongoose.Schema({
//          name:{
//             type:String,
//          },
//                 price:{
//                     type:Number,
//                 },
//     product_quantity: { type: Number, required: true },
//   });


const orderSchema=new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true },
quantity:{
    type:Number,
},

    orderDate: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Number,
        required: true
    },
    

    items:  {
        name: String,
        price: Number,
        quantity: Number,
        // Add other properties as needed
      }, // Use the orderItemSchema for each item in the array

})

const Order = mongoose.model('Order', orderSchema);
//const OrderProduct = mongoose.model('OrderProduct', orderItemSchema);

module.exports = { Order};