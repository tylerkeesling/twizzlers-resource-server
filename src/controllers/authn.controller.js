const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const okta = require('@okta/okta-sdk-nodejs');
const { NO_CONTENT } = require('http-status');

const BASE_URL = 'https://dev-76476905.okta.com/api/v1/authn';

const FACTOR_TYPES = {
  TOTP: 'token:software:totp',
  PUSH: 'push',
};

const PROVIDERS = {
  OKTA: 'OKTA',
  GOOGLE: 'GOOGLE',
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const client = new okta.Client({
  orgUrl: process.env.BASE_URL,
  token: process.env.API_TOKEN,
});

const enroll = catchAsync(async (req, res) => {
  const { stateToken, factorType, provider } = req.body;

  const data = {
    stateToken,
    factorType: FACTOR_TYPES[factorType],
    provider: PROVIDERS[provider],
  };

  const response = await client.http.http(`${BASE_URL}/factors`, {
    method: 'post',
    headers,
    body: JSON.stringify(data),
  });

  const json = await response.json();

  res.status(response.status).send(json);
});

const primaryAuthn = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  const data = {
    username,
    password,
    options: {
      multiOptionalFactorEnroll: true,
      warnBeforePasswordExpired: true,
    },
  };

  const response = await client.http.http(`${BASE_URL}`, {
    method: 'post',
    headers,
    body: JSON.stringify(data),
  });

  const json = await response.json();

  res.status(response.status).send(json);
});

const verify = catchAsync(async (req, res) => {
  const { factorId } = req.params;
  const { stateToken, passCode } = req.body;

  // PUSH factor does not have passcode

  const data = {
    stateToken,
    passCode,
  };

  const response = await client.http.http(`${BASE_URL}/factors/${factorId}/verify`, {
    method: 'post',
    headers,
    body: JSON.stringify(data),
  });

  const json = await response.json();

  res.status(response.status).send(json);
});

module.exports = {
  enroll,
  primaryAuthn,
  verify,
};
