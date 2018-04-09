import { checkPermission, removeUndefined, setSearchTerm, getSortBy } from './util'

import { addMailbox, updateMailbox, deleteMailbox, getMailboxes } from '../business/mailbox'

const resolvers = {
  Query: {
    mailboxes: async (root, args, context) => {
      const { skip, limit, sortByFields, searchTerm, token } = args
      await checkPermission(token || context.token, 'VIEWER')

      removeUndefined(args)
      setSearchTerm(args, searchTerm)
      const sortBy = getSortBy(sortByFields)
      return getMailboxes(args, skip, limit, sortBy)
    }
  },

  Mutation: {
    addMailbox: async (root, { mailbox: { name }, token }, context) => {
      const user = await checkPermission(token || context.token, 'MODERATOR', 'MESSAGE')

      return addContact(user.username)(name, description)
    },

    updateMailbox: async (root, { _id, doc }, context) => {
      const user = await checkPermission(token || context.token, 'MODERATOR', 'MESSAGE')

      return updateContact(user.username)(_id, doc)
    },

    deleteMailbox: async (root, { _id, token }, context) => {
      const user = await checkPermission(token || context.token, 'MODERATOR', 'MESSAGE')

      return deleteMailbox(user.username)(_id)
    }
  }
}

export default resolvers
