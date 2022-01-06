const allRoles = {
  ROLE_BASE: ['blog:read'],
  ROLE_EDITOR: ['blog:read', 'blog:write'],
  ROLE_ADMIN: ['blog:read', 'blog:write', 'users:read', 'users:write', 'users:update'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
