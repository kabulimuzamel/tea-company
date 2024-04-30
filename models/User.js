const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Oops, we are missing your name!'],
		minLength: 3,
		maxLength: 20,
	},
	email: {
		type: String,
		required: [true, 'Aha, we are missing your email address!'],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Hmm, looks like an email validation error!',
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'looks like you did not provide a password!'],
		minLength: 6,
	},
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

UserSchema.index(
	{
		email: 1,
	},
	{
		unique: true,
	}
)

UserSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
	return jwt.sign(
		{
			userId: this._id,
			name: this.name,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_LIFETIME,
		}
	)
}

UserSchema.methods.comparePassword = async function (enteredPassword) {
	const isMatch = await bcrypt.compare(enteredPassword, this.password)
	return isMatch
}

module.exports = mongoose.model('User', UserSchema)
