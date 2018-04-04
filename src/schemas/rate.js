const Rate =
  `type Rate {
    _id: ID!
    from_currency: String
    to_currency: String
    rate: Float
    # Unix epoch time
    date: Int 
  }`
const RateInput =
  `input RateInput {
    from_currency: String
    to_currency: String
    exchange_rate: Float
    # Unix epoch time
    date: Int 
  }`

const RateListResult =
  `type RateListResult {
    items: [Rate]
    total: Int
  }`


export default () => [
  Rate,
  RateInput,
  RateListResult
]
