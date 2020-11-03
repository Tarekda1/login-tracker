const express = require('express');
const router = express.Router();
const { requireSignin } = require('../controllers/auth');
const { getSessionByLoggedInUser, getSessionByUser } = require('../controllers/sessions');

router.get('/getSessionByLoggedInUser', requireSignin, getSessionByLoggedInUser);
router.get('/getSessionByUser', requireSignin, getSessionByUser);

module.exports = router;
