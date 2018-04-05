import {
  makeExecutableSchema,
  // addMockFunctionsToSchema,
} from 'graphql-tools'

import Auth from './schemas/auth'
import Contact from './schemas/contact'
import Message from './schemas/message'
import Mailbox from './schemas/mailbox'
import User from './schemas/user'

import resolvers from './resolvers'

const typeDefs = `

#-------------------------------------------------------------------------------------------------------
type Query {
  contacts(user_id: String, skip: Int = 0, limit: Int = 0, sortByFields: [String], token: String): ContactListResult,
  messages(user_id: String, searchTerm: String, searchId: String, searchIdMatch: String, skip: Int = 0, limit: Int = 0, sortByFields: [String], token: String): MessageListResult,
  users(searchUsername: String, role: String, skip: Int = 0, limit: Int = 0, sortByFields: [String], token: String): UserListResult,
  mailboxes(token: String): MailboxListResult
}

type Mutation {
  addUser(user: UserInput, token: String): User  
  addContact(contact: ContactInput): Contact
  addMessage(message: MessageInput, token: String): Message
  addMailbox(mailbox: MailboxInput, token: String): Mailbox
      
  updateUser(username: String, user: UserUpdateInput, token: String): User
  updateUserPassword(username: String, currentPassword: String!, newPassword: String!, token: String): User
  updateContact(_id: ID, contact: ContactInput, token: String): Contact
  updateMessage(_id: ID, message: MessageInput, token: String): Message
  updateMailbox(_id: ID, mailbox: MailboxInput, token: String): Mailbox
  
  deleteContact(_id: ID, token: String): String
  deleteMessage(_id: ID, token: String): String
  deleteUser(_id: ID, token: String): String
  deleteMailbox(_id: ID, token: String): String
  
  login(loginInput: LoginInput): TokenInfo
  logout(token: String): Logout
}
`

const schema = makeExecutableSchema({ 
  typeDefs: [
    typeDefs,
    Auth,
    Contact,
    Message,
    Mailbox,
    User
  ],
  resolvers
})

export { schema }
