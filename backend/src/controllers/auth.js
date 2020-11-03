const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/auth');

exports.signup = (req, res, next) => {
	//check user
	User.findOne({ email: req.body.email }).exec((err, user) => {
		if (user) {
			return res.status(200).json({ message: 'user already registered' });
		}

		const { firstName, lastName, email, password } = req.body;
		const _user = new User({
			firstName,
			lastName,
			email,
			password,
			username: Math.random().toString()
		});

		_user.save((err, data) => {
			if (err) {
				return res.status(400).json({
					message: 'Something wen wrong'
				});
			}
			if (data) {
				return res.status(201).json({
					message: 'Successfully signed up'
				});
			}
		});
	});
};

exports.signin = (req, res) => {
	User.findOne({ email: req.body.email }).exec((err, user) => {
		if (err) return res.status(400).json({ err });
		if (user) {
			if (user.authenticate(req.body.password)) {
				const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
				const { _id, firstName, lastName, email, role, fullName } = user;
				return res.status(200).json({ user: { _id, firstName, lastName, email, role, fullName }, token });
			}
		} else {
			return res.status(400).json({ message: 'Invalid password' });
		}
	});
};

exports.requireSignin = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Unauthorized' });
	}
};
