var express = require('express');
const testRoute = require('./test.route');
const usersRoute = require('./users.route');
const groupsRoute = require('./groups.route');

var router = express.Router();

const defaultRoutes = [
  { path: '/test', route: testRoute },
  { path: '/users', route: usersRoute },
  { path: '/groups', route: groupsRoute },
];

// hello
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
