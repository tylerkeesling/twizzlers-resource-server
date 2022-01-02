const express = require('express');
const auth = require('../../middleware/auth');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const testController = require('../../controllers/test.controller');

// const oktaJwtVerifier = new OktaJwtVerifier({
//   clientId: process.env.SPA_CLIENT_ID,
//   issuer: process.env.ISSUER,
//   assertClaims: {
//     aud: process.env.CLAIM_AUD,
//     cid: process.env.CLAIM_CID,
//   },
//   testing: {
//     disableHttpsCheck: true,
//   },
// });

// function authenticationRequired(req, res, next) {
//   const authHeader = req.headers.authorization || '';
//   const match = authHeader.match(/Bearer (.+)/);

//   if (!match) {
//     res.status(401);
//     return next('Unauthorized');
//   }

//   const accessToken = match[1];
//   const audience = process.env.CLAIM_AUD;
//   return oktaJwtVerifier
//     .verifyAccessToken(accessToken, audience)
//     .then((jwt) => {
//       req.jwt = jwt;
//       next();
//     })
//     .catch((err) => {
//       res.status(401).send(err.message);
//     });
// }

const router = express.Router();

router.route('/').get(auth('getUsers'), testController.getUser);

module.exports = router;
