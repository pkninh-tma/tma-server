import { checkPermission, removeUndefined, setSearchTerm, getSortBy } from './util'

import { addMessage, updateMessage, deleteMessage, getMessages } from '../business/message'

const resolvers = {
  Query: {
    messages: async (root, args, context) => {
      const { skip, limit, sortByFields, searchTerm, token } = args
      await checkPermission(token || context.token, "get_message")

      removeUndefined(args)
      setSearchTerm(args, searchTerm)
      const sortBy = getSortBy(sortByFields)
      return getMessages(args, skip, limit, sortBy)
    }
  },

  Mutation: {
    addMessage: async (root, { message: { from, to, subject, type, status }, token }, context) => {
      const user = await checkPermission(token || context.token, "add_message")
      return addMessage(user.username)(name, from, to, subject, undefined, type, status)
    },

    updateMessage: async (root, { _id, message }, context) => {
      const user = await checkPermission(token || context.token, "update_message")

      return updateMessage(user.username)(_id, doc)
    },

    deleteMessage: async (root, { _id, token }, context) => {
      const user = await checkPermission(token || context.token, "delete_message")

      return deleteMessage(user.username)(_id)
    }
  }
}

export default resolvers
