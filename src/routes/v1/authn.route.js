const express = require('express');

const authnController = require('../../controllers/authn.controller');

const router = express.Router();

router.route('/').post(authnController.primaryAuthn);
router.route('/factors').post(authnController.enroll);
router.route('/factors/:factorId/verify').post(authnController.verify);

module.exports = router;
