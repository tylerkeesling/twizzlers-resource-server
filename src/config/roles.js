const allRoles = {
  ROLE_BASE: ['posts:read'],
  ROLE_EDITOR: ['posts:read', 'posts:write'],
  ROLE_ADMIN: ['posts:read', 'posts:write', 'users:read', 'users:write', 'users:update'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
