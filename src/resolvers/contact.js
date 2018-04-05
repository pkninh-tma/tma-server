import { checkPermission, removeUndefined, setSearchTerm, getSortBy } from './util'

import { addContact, updateContact, deleteContact, getContacts } from '../business/contact'

const resolvers = {
  Query: {
    contacts: (root, args, context) => {
      console.log('start')
      const { skip, limit, sortByFields, searchTerm, token } = args
      checkPermission(token || context.token, 'VIEWER')
      console.log('xxx21xx')
      removeUndefined(args)
      console.log('args', args)
      setSearchTerm(args, searchTerm)
      const sortBy = getSortBy(sortByFields)
      console.log('xxxerrfaeg', args, skip, limit, sortBy)
      return getContacts(args, skip, limit, sortBy).then(r => {
        console.log('xxxxxx', r)
        return r
      })
    }
  },

  Mutation: {
    addContact: (root, { contact: { name, description }, token }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'MESSAGE')

      return addContact(user.username)(name, description)
    },

    updateMessage: (root, { _id, doc }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'MESSAGE')

      return updateContact(user.username)(_id, doc)
    },

    deleteMessage: (root, { _id, token }, context) => {
      const user = checkPermission(token || context.token, 'MODERATOR', 'MESSAGE')

      return deleteContact(user.username)(_id)
    }
  }
}

export default resolvers
