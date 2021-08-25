const express = require('express');
const {
  register, login, currentUser, logout
} = require('../controllers/auth');

const router = express.Router();
const { authenticate } = require('../middleware/authenticate');

// router.post('/register', register);

router.route('/register').post(register)
router.route('/login').post(login)
router.get('/current-user', authenticate, currentUser);
router.get('/logout', authenticate, logout);

module.exports = router;