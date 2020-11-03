const Session = require('../models/user-session');
const mongoose = require('mongoose');

exports.getSessionByLoggedInUser = async (req, res, next) => {
	let user = req.user;
	console.log(user);
	try {
		let sessionsByUser = await Session.find({ user: user }).populate('user');
		return res.status(200).json({ sessions: sessionsByUser });
	} catch (error) {
		res.status(400).json({ message: `err: ${error}` });
	}
};

exports.getSessionByUser = async (req, res, next) => {
	let user = req.body.user;
	console.log(user);
	try {
		let sessionsByUser = await Session.find({ user: mongoose.Types.ObjectId(user) }).populate('user');
		return res.status(200).json({ sessions: sessionsByUser });
	} catch (error) {
		res.status(400).json({ message: `err: ${error}` });
	}
};
