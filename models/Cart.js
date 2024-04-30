const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
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
                require: [true, 'Please let us know what you want to buy']
            },
            quantity: {
                type: Number,
                min: 1,
                required: [true, 'Please let us know how many you want to buy']
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);