import { checkPermission, removeUndefined, setSearchTerm, setSearchId, setSearchIdMatch, getSortBy } from './util'

import { addInvestor, getInvestors, updateInvestor, deleteInvestor, send_notification } from '../business/investor'

const resolvers = {
  Query: {
    investors: (root, args, context) => {      
      const { skip, limit, sortByFields, searchTerm, searchId, searchIdMatch, token } = args
      checkPermission(token || context.token, 'VIEWER')

      removeUndefined(args)
      setSearchTerm(args, searchTerm)
      setSearchId(args, searchId)
      setSearchIdMatch(args, searchIdMatch)
      const sortBy = getSortBy(sortByFields)
      return getInvestors(args, skip, limit, sortBy)
    },
  },

  Mutation: {
    addInvestor: (root, { investor: { name, _id, email, address, create_time }, token }, context) => {      
      const user = checkPermission(token || context.token, 'MODERATOR', 'INVESTOR')

      return addInvestor(user.username)(_id, name, email, address, create_time)
    },

    updateInvestor: (root, { _id, investor, token }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'INVESTOR')

      return updateInvestor(user.username)(_id, investor)
    },

    deleteInvestor: (root, { _id, token }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'INVESTOR')

      return deleteInvestor(user.username)(_id)
    }
  }
}

export default resolvers
