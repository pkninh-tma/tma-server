const LoginInput =
  `input LoginInput {
    username: String!
    password: String
  }`

const LoginInfo =
  `type LoginInfo {
    status: String
    message: String
  }`

const TokenInfo =
  `type TokenInfo {
    username: String
    # role of the user, values = ADMIN, MODERATOR, VIEWER
    role: String
    # verified login message
    message: String
    token: String
  }`
  
const Logout =
  `type Logout {
    message: String
  }`

export default () => [
  LoginInput,
  LoginInfo,
  TokenInfo,
  Logout
]
