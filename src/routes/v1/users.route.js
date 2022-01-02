const express = require('express');
const auth = require('../../middleware/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.route('/').get(auth('manageUsers'), userController.getAllUsers);

router.route('/admins').get(auth('manageUsers'), userController.getAdmins);

router.route('/non-admins').get(auth('manageUsers'), userController.getNonAdmins);

// router
// .route('/:userId')
// .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
// .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
// .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
