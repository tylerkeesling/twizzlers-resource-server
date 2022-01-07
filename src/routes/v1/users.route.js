const express = require('express');
const auth = require('../../middleware/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.route('/').get(auth('users:read'), userController.listUsers).post(userController.createUser);

router.route('/:userId').put(auth('users:update'), userController.updateUser);

router.route('/:userId/factors/catalog').get(userController.listFactorsToEnroll);

module.exports = router;
