const express = require('express');
const auth = require('../../middleware/auth');
const groupsController = require('../../controllers/groups.controller');

const router = express.Router();

router.route('/:groupId/users').get(auth('manageUsers'), groupsController.getUsers);

router
  .route('/:groupId/users/:userId')
  .put(auth('manageGroups'), groupsController.addUser)
  .delete(auth('manageGroups'), groupsController.deleteUser);

// router
// .route('/:userId')
// .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
// .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
// .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
