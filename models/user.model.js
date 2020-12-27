const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: String,
	description: String,
	wallet: {
		walletId: String,
		balance: Number
	}	
}, {
	timestamps: true
});


module.exports = mongoose.model('User', userSchema);
