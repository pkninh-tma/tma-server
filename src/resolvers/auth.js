import { login, logout } from '../auth'

const resolvers = {
  Query: {

  },

  Mutation: {
    login: (root, { loginInput: { username, password } }, context) => {
      return login(username, password)
      // req.logIn(user, function (err) {...
    },
    logout: (root, { token }, context) => {
      return logout(token)
    }
  }
}

export default resolvers
