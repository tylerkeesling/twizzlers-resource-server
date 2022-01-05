const allRoles = {
  user: ['posts_read'],
  admin: ['getUsers', 'manageUsers', 'manageGroups'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
