//Imports
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

// Middleware => Bruteforce
const protect = require('../middleware/bruteforce');

//Routage
router.post("/signup", userCtrl.signup);
router.post("/login",protect, userCtrl.login);
router.get('/me', auth, userCtrl.userProfil);
router.put('/update',auth, userCtrl.changePwd);
router.delete('/delete', auth, userCtrl.deleteProfile)

module.exports = router;