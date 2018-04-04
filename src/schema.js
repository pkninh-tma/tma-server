import {
  makeExecutableSchema,
  // addMockFunctionsToSchema,
} from 'graphql-tools'

import Account from './schemas/account'
import Auth from './schemas/auth'
import Document from './schemas/document'
import Investor from './schemas/investor'
import Rate from './schemas/rate'
import User from './schemas/user'

import resolvers from './resolvers'

const typeDefs = `

#-------------------------------------------------------------------------------------------------------
type Query {
  accounts(skip: Int = 0, limit: Int = 0, sortByFields: [String], token: String): AccountResultList,
  investors(_id: String, name: String, searchTerm: String, searchId: String, searchIdMatch: String, skip: Int = 0, limit: Int = 0, sortByFields: [String], token: String): InvestorListResult,
  users(searchUsername: String, role: String, skip: Int = 0, limit: Int = 0, sortByFields: [String], token: String): UserListResult,
  rates(_id: String, from_currency: String, date: String, skip: Int = 0, limit: Int = 0, sortByFields: [String], token: String): RateListResult,
  documents(_id: String, name: String, ref_id: String, searchTerm: String, skip: Int = 0, limit: Int = 0, sortByFields: [String], token: String): DocumentListResult  
}

type Mutation {
  addInvestor(investor: InvestorInput, token: String): Investor
  addUser(user: UserInput, token: String): User
  addAccount(account: AccountInput, token: String): Account
  addDocument(document: DocumentInput): Document
  addRate(rate: RateInput, token: String): Rate
    
  updateInvestor(_id: ID, investor: InvestorInput, token: String): Investor
  updateUser(username: String, user: UserUpdateInput, token: String): User
  updateDocument(_id: ID, document: DocumentInput, token: String): Document
  updateRate(_id: ID, rate: RateInput, token: String): Rate
  
  deleteInvestor(_id: ID, token: String): String
  deleteDocument(_id: ID, token: String): String
  deleteUser(username: String, token: String): String
  deleteRate(_id: ID, token: String): String
  
  login(loginInput: LoginInput): LoginInfo
  logout(token: String): Logout
}
`

const schema = makeExecutableSchema({ 
  typeDefs: [
    typeDefs,
    Account,
    Auth,
    Document,
    Investor,
    Rate,    
    User
  ],
  resolvers
})

export { schema }
