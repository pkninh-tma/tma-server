import { checkPermission, removeUndefined, setSearchTerm, getSortBy } from './util'

import { addMessage, updateMessage, deleteMessage, getMessages } from '../business/message'

const resolvers = {
  Query: {
    messages: (root, args, context) => {
      const { skip, limit, sortByFields, searchTerm, token } = args
      checkPermission(token || context.token, 'VIEWER')

      removeUndefined(args)
      setSearchTerm(args, searchTerm)
      const sortBy = getSortBy(sortByFields)
      return getMessages(args, skip, limit, sortBy)
    }
  },

  Mutation: {
    addMessage: (root, { document: { name, description }, token }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'MESSAGE')

      return addDocument(user.username)(name, description)
    },

    updateMessage: (root, { _id, doc }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'MESSAGE')

      return updateDocument(user.username)(_id, doc)
    },

    deleteMessage: (root, { _id, token }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'MESSAGE')

      return deleteMessage(user.username)(_id)
    }
  }
}

export default resolvers
