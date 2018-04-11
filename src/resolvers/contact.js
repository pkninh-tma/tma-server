import { checkPermission, removeUndefined, setSearchTerm, getSortBy } from './util'

import { addContact, updateContact, deleteContact, getContacts } from '../business/contact'

const resolvers = {
  Query: {
    contacts: async (root, args, context) => {
      
      const { skip, limit, sortByFields, searchTerm, token } = args
      await checkPermission(token || context.token, "get_contact")
      
      removeUndefined(args)
      setSearchTerm(args, searchTerm)
      const sortBy = getSortBy(sortByFields)
      
      return getContacts(args, skip, limit, sortBy)
    }
  },

  Mutation: {
    addContact: async (root, { contact: { name, description }, token }, context) => {
      const user = await checkPermission(token || context.token, "add_contact")

      return addContact(user.username)(name, description)
    },

    updateContact: async (root, { _id, doc }, context) => {
      const user = checkPermission(token || context.token, "update_contact")

      return updateContact(user.username)(_id, doc)
    },

    deleteContact: async (root, { _id, token }, context) => {
      const user = await checkPermission(token || context.token, "delete_contact")

      return deleteContact(user.username)(_id)
    }
  }
}

export default resolvers
