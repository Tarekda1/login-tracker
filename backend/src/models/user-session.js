const mongoose = require('mongoose');

const userSessionSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{ timestamps: true }
);

const userSessionModel = mongoose.model('UserSession', userSessionSchema);

module.exports = userSessionModel;
