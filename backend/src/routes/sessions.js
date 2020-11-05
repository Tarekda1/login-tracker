const express = require('express');
const router = express.Router();
const { requireSignin } = require('../controllers/auth');
const { getSessionByLoggedInUser, getOtherUsersSessions } = require('../controllers/sessions');

router.get('/getSessionByLoggedInUser', requireSignin, getSessionByLoggedInUser);
router.get('/getOtherUsersSessions', requireSignin, getOtherUsersSessions);

module.exports = router;
