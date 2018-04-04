const Account =
  `type Account {
    _id: ID!
    name: String
    investor: Investor
    create_time: Int
  }`

const AccountInput =
  `input AccountInput {
    investor_id: ID
    amount: Float
    note: String
    rate: Float
    create_time: Int
  }`


export default () => [
  Account,
  AccountInput,
  AccountResultList,
]
