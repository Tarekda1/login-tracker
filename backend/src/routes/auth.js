const express = require('express');
const router = express.Router();
const { signup, signin, requireSignin } = require('../controllers/auth');

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/profile', requireSignin, (req, res) => {
	res.status(200).json({ user: req.user });
});

module.exports = router;
