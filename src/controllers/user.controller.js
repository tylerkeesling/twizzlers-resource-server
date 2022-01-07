const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const okta = require('@okta/okta-sdk-nodejs');
const { roles } = require('../config/roles');

const USERS_GROUP_ID = '00g3hn3uujmZrkmvp5d7';
const ADMIN_GROUP_ID = '00g3hn4hvbH53HiSE5d7';

const BASE_API = 'https://dev-76476905.okta.com/api/v1';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const client = new okta.Client({
  orgUrl: process.env.BASE_URL,
  token: process.env.API_TOKEN,
});

const createUser = catchAsync(async (req, res) => {
  const newUser = {
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.email,
      role: roles.find((role) => role.includes('BASE')),
    },
    credentials: {
      password: { value: req.body.password },
    },
  };

  const user = await client.createUser(newUser);
  res.status(httpStatus.CREATED).send(user);
});

const listUsers = catchAsync(async (req, res) => {
  const APP_ID = process.env.SPA_CLIENT_ID;
  const response = await client.http.http(`${BASE_API}/apps/${APP_ID}/users`, {
    method: 'get',
    headers,
  });

  const users = await response.json();

  res.status(httpStatus.OK).send(users);
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const {
    profile: { role },
  } = req.body;

  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing user ID');
  }

  const user = await client.getUser(userId);

  user.profile.role = role;
  const updatedUser = await user.update();

  res.send(updatedUser);
});

const listFactorsToEnroll = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const response = await client.http.http(`${BASE_API}/users/${userId}/factors/catalog`, {
    method: 'get',
    headers,
  });

  const json = await response.json();

  res.status(response.status).send(json);
});

module.exports = {
  listUsers,
  createUser,
  updateUser,
  listFactorsToEnroll,
};
