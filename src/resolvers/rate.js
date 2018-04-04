import { checkPermission, removeUndefined, getSortBy } from './util'
import { addRate, getRates, deleteRate, updateRate } from '../business/rate'

const resolvers = {
  Query: {
    rates: (root, args, context) => {
      const { skip, limit, sortByFields, token } = args
      checkPermission(token || context.token, 'VIEWER')

      removeUndefined(args)
      const sortBy = getSortBy(sortByFields)
      return getRates(args, skip, limit, sortBy)
    },
  },

  Mutation: {
    addRate: (root, { rate: { from_currency, to_currency, exchange_rate, date }, token }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'EXCHANGE_RATE')

      return addRate(user.username)(from_currency, to_currency, exchange_rate, date)
    },

    updateRate: (root, { _id, rate }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'EXCHANGE_RATE')
      
      return updateRate(user.username)(_id, rate)
    },

    deleteRate: (root, { _id, token }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'EXCHANGE_RATE')

      return deleteRate(user.username)(_id)
    }
  }
}

export default resolvers
