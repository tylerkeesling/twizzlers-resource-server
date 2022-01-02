const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const okta = require('@okta/okta-sdk-nodejs');

const USERS_GROUP_ID = '00g3gs22j5Yh1BrlP5d7';
const ADMIN_GROUP_ID = '00g3grzlxtmFbkIzZ5d7';

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

  const admins = client.http.http(
    `https://dev-76476905.okta.com/api/v1/groups/${ADMIN_GROUP_ID}/users`,
    {
      method: 'get',
      headers,
    }
  );

  const values = await Promise.all([everyone, admins]);
  const everyoneVals = await values[0].json();
  const adminVals = await values[1].json();

  const adminIds = adminVals.map((user) => user.id);
  const result = everyoneVals.filter((user) => !adminIds.includes(user.id));
  res.send(result);
};

module.exports = {
  getAllUsers,
  getAdmins,
  getNonAdmins,
};
