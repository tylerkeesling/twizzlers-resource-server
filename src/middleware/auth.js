const OktaJwtVerifier = require('@okta/jwt-verifier');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.SPA_CLIENT_ID,
  issuer: process.env.ISSUER,
  assertClaims: {
    aud: process.env.CLAIM_AUD,
    cid: process.env.CLAIM_CID,
  },
  testing: {
    disableHttpsCheck: process.env.DISABLE_HTTPS_CHECK,
  },
});

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) =>
      userRights.includes(requiredRight)
    );
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    const accessToken = match[1];
    const audience = process.env.CLAIM_AUD;

    // console.log('access', accessToken);

    return oktaJwtVerifier
      .verifyAccessToken(accessToken, audience)
      .then((jwt) => {
        req.jwt = jwt;
        // const claims = jwt.claims;
        // const userRights = [];

        // console.log('roleRighgts', roleRights);

        // roleRights.forEach((v, k) => {
        //   // if (claims.includes(k)) {
        //   //   userRights.push(...v);
        //   // }
        //   console.log(`key: ${k}, value: ${v}`);
        // });

        // console.log('claims', claims);
        // console.log('user rights', userRights);

        // const hasRequiredRights = requiredRights.every((requiredRight) =>
        //   userRights.includes(requiredRight)
        // );

        next();
      })

      .catch((err) => {
        console.log(err);
        next(err);
      });
  };

module.exports = auth;
