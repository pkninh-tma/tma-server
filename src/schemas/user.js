const User =
  `type User {
    _id: ID!
    username: String  
    role: String # name of the role
  }`

const UserInput =
  `input UserInput {
    username: String!
    password: String!
    role: String
  }`


const UserUpdateInput =
  `input UserUpdateInput {
    role: String # name of the role
  }`

const UserListResult = 
  `type UserListResult {
    items: [User]
    total: Int
  }
  `

export default () => [
  User,
  UserInput,
  UserUpdateInput,
  UserListResult
]
