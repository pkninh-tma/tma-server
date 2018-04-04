import merge from 'lodash/merge'

import Account from './resolvers/account'
import Auth from './resolvers/auth'
import Document from './resolvers/document'
import Investor from './resolvers/investor'
import Rate from './resolvers/rate'
import User from './resolvers/user'

import GraphQLJSON from 'graphql-type-json';

const resolveFunctions = {
  JSON: GraphQLJSON
};

const resolvers = merge(
  Account,
  Auth,
  Document,
  Investor,
  Rate,
  User,
  resolveFunctions
)

export default resolvers
