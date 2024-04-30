const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user information'],
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: [true, 'Please provide product information'],
		},
		rating: {
			type: Number,
			required: [true, 'please rate the product between 1 and 5'],
			min: 1,
			max: 5,
		},
		comment: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Review', ReviewSchema)
