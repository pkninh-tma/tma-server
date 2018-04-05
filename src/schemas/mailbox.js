const Mailbox =
  `type Mailbox {
    _id: ID!
    name: String
  }`

const MailboxInput =
  `input MailboxInput {
    name: String
  }`


const MailboxListResult =
  `type MailboxListResult {
    items: [Mailbox]
    total: Int
  }`

export default () => [
  Mailbox,
  MailboxInput,
  MailboxListResult
]
