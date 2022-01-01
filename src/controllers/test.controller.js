const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const getUser = catchAsync(async (req, res) => {
  // const user = await userService.getUserById(req.params.userId);
  const user = {
    first_name: 'Tyler',
    last_name: 'Keesling',
  };

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  res.send(user);
});

module.exports = {
  getUser,
};
