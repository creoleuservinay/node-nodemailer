const express = require('express');
const userController =  require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(userController.userSingup);
router.route('/login').post(userController.login);
router.route('/me').get(auth, userController.allUsers);
router.route('/logout').post(auth, userController.logout);

module.exports = router;  