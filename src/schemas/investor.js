const Investor =
  `type Investor {
    _id: ID!
    name: String
    email: String
    address: String
    accounts: [Account]
    create_time: Int
  }`

const InvestorInput = 
  `
  scalar JSON

  input InvestorInput {
    _id: String
    name: String
    email: String
    address: String
    create_time: Int
  }`

const InvestorListResult =
 `type InvestorListResult {
    items: [Investor]
    total: Int
  }`

export default () => [
  Investor,
  InvestorInput,
  InvestorListResult,
  Bank
]
