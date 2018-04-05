import merge from 'lodash/merge'

import Auth from './resolvers/auth'
import Contact from './resolvers/contact'
import Message from './resolvers/message'
import Mailbox from './resolvers/mailbox'
import User from './resolvers/user'

// import GraphQLJSON from 'graphql-type-json';

// const resolveFunctions = {
//   JSON: GraphQLJSON
// };

const resolvers = merge(
  Auth,
  Contact,
  Message,
  User,
  Mailbox,
  // resolveFunctions
)

export default resolvers
