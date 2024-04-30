const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: reqMessage('name'),
		minLength: 3,
		maxLength: 30,
	},
	description: {
		type: String,
		required: reqMessage('description'),
	},
	price: {
		type: Number,
		required: reqMessage('price'),
	},
	category: {
		type: String,
		required: reqMessage('category'),
		enum: ['Green Tea', 'Black Tea', 'White Tea', 'Oolong Tea', 'Herbal Tea'],
		validate: {
			validator: function (value) {
				return this.enumValues.includes(value)
			},
			message: `Invalid category entered. Categories should be one of these ${this.enumValues.join(
				', '
			)}.`,
		},
        default: 'Green Tea'
	},
	imageURL: {
		type: String,
		required: reqMessage('imageURL'),
		match: [
			/^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+\/?|localhost(:\d+)?)([\w\-._~:/?#[\]@!$&'()*+,;=]*)$/,
            'Invalid image url entered.'
		],
	},
	stockQuantity: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: 'Stock quantity must be an integer'
        }
    }
}, {timestamps: true})

function reqMessage (property) {
    return [true, `Missing ${property} for the product you want to add`]
}

module.exports = mongoose.model('Product', ProductSchema)