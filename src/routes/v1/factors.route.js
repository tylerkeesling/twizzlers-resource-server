const express = require('express');

const factorsController = require('../../controllers/factors.controller');

const router = express.Router();

router.route('/').post(factorsController.verify);

module.exports = router;
