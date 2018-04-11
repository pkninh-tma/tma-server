import { checkPermission, removeUndefined, setSearchTerm, getSortBy } from './util'

import { addMailbox, updateMailbox, deleteMailbox, getMailboxes } from '../business/mailbox'

const tableName = "mailbox"

const resolvers = {
  Query: {
    mailboxes: async (root, args, context) => {
      const { skip, limit, sortByFields, searchTerm, token } = args
      await checkPermission(token || context.token, "get_message")

      removeUndefined(args)
      setSearchTerm(args, searchTerm)
      const sortBy = getSortBy(sortByFields)
      return getMailboxes(args, skip, limit, sortBy)
    }
  },

  Mutation: {
    addMailbox: async (root, { mailbox: { name }, token }, context) => {
      const user = await checkPermission(token || context.token, "add_mailbox")

      return addContact(user.username)(name, description)
    },

    updateMailbox: async (root, { _id, doc }, context) => {
      const user = await checkPermission(token || context.token, "update_mailbox")

      return updateContact(user.username)(_id, doc)
    },

    deleteMailbox: async (root, { _id, token }, context) => {
      const user = await checkPermission(token || context.token, "delete_mailbox")

      return deleteMailbox(user.username)(_id)
    }
  }
}

export default resolvers
