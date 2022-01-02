var express = require('express');
const usersRoute = require('./users.route');
const groupsRoute = require('./groups.route');

var router = express.Router();

const defaultRoutes = [
  { path: '/users', route: usersRoute },
  { path: '/groups', route: groupsRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
