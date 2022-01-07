const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const okta = require('@okta/okta-sdk-nodejs');
const { NO_CONTENT } = require('http-status');

const BASE_URL = 'https://dev-76476905.okta.com/api/v1/users';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const client = new okta.Client({
  orgUrl: process.env.BASE_URL,
  token: process.env.API_TOKEN,
});

const verify = catchAsync(async (req, res) => {
  const { userId, factorId, passcode } = req.body;
  const data = {
    passCode: passcode,
  };

  const response = await client.http.http(
    `${BASE_URL}/${req.body.userId}/factors/${req.body.factorId}/verify`,
    {
      method: 'post',
      headers,
      body: JSON.stringify(data),
    }
  );

  const json = await response.json();

  res.status(response.status).send(json);
});

module.exports = {
  verify,
};
