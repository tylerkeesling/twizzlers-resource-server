const express = require('express');
const testController = require('../../controllers/test.controller');

const router = express.Router();

router.route('/').get(testController.getUser);

module.exports = router;
