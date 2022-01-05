const express = require('express');
const auth = require('../../middleware/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .get(auth('manageUsers'), userController.getAllUsers)
  .post(userController.createUser);

router.route('/admins').get(auth('manageUsers'), userController.getAdmins);

router.route('/non-admins').get(auth('manageUsers'), userController.getNonAdmins);

module.exports = router;
