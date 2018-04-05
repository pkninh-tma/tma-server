const Contact =
  `type Contact {
    _id: ID!
    firstName: String
    lastName: String
    phone: String,
    email: String    
  }`

const ContactInput = 
  `input ContactInput {
    firstName: String
    lastName: String
    phone: String
    email: String
  }`


const ContactListResult =  
  `type ContactListResult {
    items: [Contact]
    total: Int
  }`

export default () => [
  Contact,
  ContactInput,
  ContactListResult
]
