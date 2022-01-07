var express = require('express');
const usersRoute = require('./users.route');
const groupsRoute = require('./groups.route');
const factorsRoute = require('./factors.route');
const authnRoute = require('./authn.route');
const postsRoute = require('./posts.route');

var router = express.Router();

const defaultRoutes = [
  { path: '/users', route: usersRoute },
  { path: '/groups', route: groupsRoute },
  { path: '/factors', route: factorsRoute },
  { path: '/authn', route: authnRoute },
  { path: '/posts', route: postsRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
