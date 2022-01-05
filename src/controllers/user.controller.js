const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const okta = require('@okta/okta-sdk-nodejs');
const roles = require('../config/config').roles;

const USERS_GROUP_ID = '00g3hn3uujmZrkmvp5d7';
const ADMIN_GROUP_ID = '00g3hn4hvbH53HiSE5d7';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const client = new okta.Client({
  orgUrl: process.env.BASE_URL,
  token: process.env.API_TOKEN,
});

const getAllUsers = catchAsync(async (req, res) => {
  const response = await client.http.http(
    `https://dev-76476905.okta.com/api/v1/groups/${USERS_GROUP_ID}/users`,
    {
      method: 'get',
      headers,
    }
  );
  const finalRes = await response.json();

  res.send(finalRes);
});

const getAdmins = async (req, res) => {
  const response = await client.http.http(
    `https://dev-76476905.okta.com/api/v1/groups/${ADMIN_GROUP_ID}/users`,
    {
      method: 'get',
      headers,
    }
  );

  const finalRes = await response.json();

  res.send(finalRes);
};

const getNonAdmins = async (req, res) => {
  const everyone = client.http.http(
    `https://dev-76476905.okta.com/api/v1/groups/${USERS_GROUP_ID}/users`,
    {
      method: 'get',
      headers,
    }
  );

  const admins = client.http.http(`${BASE_URL}/api/v1/groups/${ADMIN_GROUP_ID}/users`, {
    method: 'get',
    headers,
  });

  const values = await Promise.all([everyone, admins]);
  const everyoneVals = await values[0].json();
  const adminVals = await values[1].json();

  const adminIds = adminVals.map((user) => user.id);
  const result = everyoneVals.filter((user) => !adminIds.includes(user.id));
  res.send(result);
};

const createUser = catchAsync(async (req, res) => {
  const newUser = {
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.email,
      role: roles.base,
    },
    credentials: {
      password: { value: req.body.password },
    },
  };

  const user = await client.createUser(newUser);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  getAllUsers,
  getAdmins,
  getNonAdmins,
  createUser,
};
