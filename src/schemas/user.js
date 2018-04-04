const User =
  `type User {
    username: String  
    role: String # ADMIN, MODERATOR, VIEWER
    permissions: [String!]
  }`

const UserInput =
  `input UserInput {
    username: String!
    password: String!
    # ADMIN, MODERATOR, VIEWER
    role: String
    permissions: [String!]
  }`


const UserUpdateInput =
  `input UserUpdateInput {
    # ADMIN, MODERATOR, VIEWER
    role: String
    permissions: [String!]
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
