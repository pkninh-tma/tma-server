import { checkPermission, removeUndefined, setSearchTerm, getSortBy } from './util'

import { addDocument, updateDocument, deleteDocument, getDocuments } from '../business/document'

const resolvers = {
  Query: {
    documents: (root, args, context) => {
      const { skip, limit, sortByFields, searchTerm, token } = args
      checkPermission(token || context.token, 'VIEWER')

      removeUndefined(args)
      setSearchTerm(args, searchTerm)
      const sortBy = getSortBy(sortByFields)
      return getDocuments(args, skip, limit, sortBy)
    }
  },

  Mutation: {
    addDocument: (root, { document: { name, description, type, create_time, status, version, file }, token }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'DOCUMENT')

      return addDocument(user.username)(name, description, type, create_time, status, version, file)
    },

    updateDocument: (root, { _id, doc }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'DOCUMENT')

      return updateDocument(user.username)(_id, doc)
    },

    deleteDocument: (root, { _id, token }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'DOCUMENT')

      return deleteDocument(user.username)(_id)
    }
  }
}

export default resolvers
