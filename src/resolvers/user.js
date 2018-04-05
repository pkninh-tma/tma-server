import { checkPermission, removeUndefined, setSearchTerm, getSortBy, setSearchUsername } from './util'

import { addUser, getUsers, deleteUser, updateUser, updateUserPassword, resetPassword } from '../business/user'

const resolvers = {
  Query: {
    users: (root, args, context) => {
      const { skip, limit, sortByFields, searchUsername, role, token } = args
      checkPermission(token || context.token, 'ADMIN')

      removeUndefined(args)
      if (args.role === '') { delete args.role }
      setSearchUsername(args, searchUsername)
            
      const sortBy = getSortBy(sortByFields)
      return getUsers(args, skip, limit, sortBy)
    },
  },

  Mutation: {
    addUser: (root, { user: { username, password, permissions, role, phone }, token}, context) => {
      const user_ = checkPermission(token || context.token, 'ADMIN')

      return addUser(user_.username)(username, password, role, phone, permissions)
    },

    updateUser: (root, { username, user, token }, context) => {
      const user_ = checkPermission(token || context.token, 'ADMIN')

      return updateUser(user_.username)(username, user)
    },

    deleteUser: (root, { username, token }, context) => {
      const user_ = checkPermission(token || context.token, 'ADMIN')

      return deleteUser(user_.username)(username)
    },

    updateUserPassword: (root, { username, currentPassword, newPassword, token }, context) => {
      const user_ = checkPermission(token || context.token, 'ADMIN')
      
      return updateUserPassword(user_.username)(username, currentPassword, newPassword)
    },
  }
}

export default resolvers