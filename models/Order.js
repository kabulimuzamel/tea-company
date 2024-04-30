const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user information']
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, 'Please provide the product you want to buy']
            },
            quantity: {
                type: Number,
                min: 1,
                required: [true, 'Please provide the quantity number']
            },
            price: {
                type: Number,
                required: [true, 'Please provide the price.']
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: [true, 'please provide, the the total amount of price']
    },
    shippingAddress: {
        type: String,
        required: [true, 'please provide an address for your order to be delivered.']
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'processing','shipped', 'delivered'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);