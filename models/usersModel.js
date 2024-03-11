const mongoose=require('mongoose');


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
    

    items:  [{
        name: String,
        price: Number,
        quantity: Number,
        // Add other properties as needed
      }], // Use the orderItemSchema for each item in the array

})

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
    },
    image:{
        type:String,
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
         ref: 'Cart'
    },
    orders:[orderSchema],
});

const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { User, Order };