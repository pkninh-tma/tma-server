import { checkPermission, removeUndefined, setSearchTerm, getSortBy } from './util'

import { addMailbox, updateMailbox, deleteMailbox, getMailboxes } from '../business/mailbox'

const resolvers = {
  Query: {
    mailboxes: (root, args, context) => {
      const { skip, limit, sortByFields, searchTerm, token } = args
      checkPermission(token || context.token, 'VIEWER')

      removeUndefined(args)
      setSearchTerm(args, searchTerm)
      const sortBy = getSortBy(sortByFields)
      return getMailboxes(args, skip, limit, sortBy)
    }
  },

  Mutation: {
    addMailbox: (root, { mailbox: { name }, token }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'MESSAGE')

      return addContact(user.username)(name, description)
    },

    updateMailbox: (root, { _id, doc }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'MESSAGE')

      return updateContact(user.username)(_id, doc)
    },

    deleteMailbox: (root, { _id, token }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'MESSAGE')

      return deleteMailbox(user.username)(_id)
    }
  }
}

export default resolvers
