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

exports.getOtherUsersSessions = async (req, res, next) => {
	let user = req.user;
	console.log(user);
	try {
		let sessionsByUser = await Session.find({ user: { $ne: user } }).populate('user');
		return res.status(200).json({ sessions: sessionsByUser });
	} catch (error) {
		res.status(400).json({ message: `err: ${error}` });
	}
};
