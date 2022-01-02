const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const okta = require('@okta/okta-sdk-nodejs');
const { NO_CONTENT } = require('http-status');

const USERS_GROUP_ID = '00g3gs22j5Yh1BrlP5d7';
const ADMIN_GROUP_ID = '00g3grzlxtmFbkIzZ5d7';
const BASE_URL = 'https://dev-76476905.okta.com/api/v1/groups';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const client = new okta.Client({
  orgUrl: process.env.BASE_URL,
  token: process.env.API_TOKEN,
});

const deleteUser = catchAsync(async (req, res) => {
  const response = await client.http.http(
    `${BASE_URL}/${req.params.groupId}/users/${req.params.userId}`,
    {
      method: 'delete',
      headers,
    }
  );

  res.status(response.status).send();
});

const getUsers = catchAsync(async (req, res) => {
  const response = await client.http.http(`${BASE_URL}/${req.params.groupId}/users`, {
    method: 'get',
    headers,
  });
  const finalRes = await response.json();

  res.send(finalRes);
});

const addUser = catchAsync(async (req, res) => {
  const response = await client.http.http(
    `${BASE_URL}/${req.params.groupId}/users/${req.params.userId}`,
    {
      method: 'put',
      headers,
    }
  );

  res.status(response.status).send();
});

module.exports = {
  getUsers,
  deleteUser,
  addUser,
};
