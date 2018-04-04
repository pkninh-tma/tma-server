// import { checkPermission, removeUndefined, setSearchTerm, getSortBy } from './util'

import { login } from '../auth'

const resolvers = {
  Query: {

  },

  Mutation: {
    login: (root, { loginInput: { username, password } }, context) => {
      return login(username, password)
      // req.logIn(user, function (err) {...
    },
    logout: (root, { token }, context) => {
      // req.session.destroy();
    }
  }
}

export default resolvers
