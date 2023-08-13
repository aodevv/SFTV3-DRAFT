export const root = 'https://core-v3.safetytracker.be/api/admin';

export const paths = {
  login: '/login',
  forgetPassword: '/forget-password',
  resetPassword: '/reset-password',
  getProfile: '/profile',
  updateProfile: '/profile',
  getAllClients: '/clients',
  getClientsBy: '/clients/search',
  getClientById: '/client',
  postClient: '/clients',
  updateClient: '/clients',
  updateClientContact: '/client/update/contact',
  deleteClient: '/clients',
  getAllUsers: '/users/manage',
  getUserById: '/users/manage',
  postUser: '/users/manage',
  editUser: '/users/manage',
  deleteUser: '/users/manage',
  searchUser: '/users/manage/search',
  getAllFunctions: '/functions',
  postFunction: '/functions',
  deleteFunction: '/functions',
  // getAllRoles: '/roles',
  // postRole: '/roles',
  // updateRole: '/roles',
  // deleteRole: '/roles',
  updateUserStatus: '/users/status',
};

export const rolesPaths = {
  getPermissions: '/permissions',
  toggleStatus: '/permissions?_method=put',
  roles: '/roles',
};
