import { checkPermission, removeUndefined, getSortBy } from './util'

import { addAccount, getAccounts } from '../business/account'

const resolvers = {
  Query: {
    accounts: (root, args, context) => {      
      const { skip, limit, sortByFields, token } = args
      checkPermission(token || context.token, 'VIEWER', 'INVESTING')
      
      removeUndefined(args)      
      const sortBy = getSortBy(sortByFields)
      return getAccounts(args, skip, limit, sortBy)
    }
  },

  Mutation: {
    addAccount: (root, { account: { investor_id, amount, create_time, note, rate }, token}, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'INVESTING')

      return addAccount(user.username)(investor_id, amount, create_time, note, rate)
    },
  }
}

export default resolvers
