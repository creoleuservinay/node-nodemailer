const express = require('express');
const enquiryController =  require('../controllers/inquiryController');
const router = express.Router();

router.route('/contact-us').post(enquiryController.newInquiry);

module.exports = router;  